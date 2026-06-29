import crypto from 'crypto'

import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'
import { appConfig } from '@src/configs/app.config'
import { ProcessSuccessfulPaymentService } from './processSuccessfulPayment.service'

const SUPPORTED_EVENTS = {
    PAYMENT_CAPTURED: 'payment.captured',
    PAYMENT_FAILED: 'payment.failed'
}

export class WebhookService extends ServiceBase {
    async process(req) {
        const transaction = this.context.transaction

        try {
            const signature =
                req.headers['x-razorpay-signature']

            if (!signature) {
                throw new Error(
                    'Missing webhook signature'
                )
            }

            const rawBody = req.rawBody || req.body

            if (!Buffer.isBuffer(rawBody)) {
                throw new Error(
                    'Webhook body must be a Buffer'
                )
            }

            // Verify webhook signature
            const expectedSignature =
                crypto
                    .createHmac(
                        'sha256',
                        appConfig.razorpay.webhookSecret
                    )
                    .update(rawBody)
                    .digest('hex')

            const expectedBuffer =
                Buffer.from(expectedSignature)

            const receivedBuffer =
                Buffer.from(signature)

            if (
                expectedBuffer.length !==
                receivedBuffer.length
            ) {
                throw new Error(
                    'Invalid webhook signature'
                )
            }

            const isValid =
                crypto.timingSafeEqual(
                    expectedBuffer,
                    receivedBuffer
                )

            if (!isValid) {
                throw new Error(
                    'Invalid webhook signature'
                )
            }

            // Parse only after verification
            const payload =
                JSON.parse(
                    rawBody.toString('utf8')
                )

            const event = payload.event

            // Ignore unsupported events
            if (
                !Object.values(
                    SUPPORTED_EVENTS
                ).includes(event)
            ) {
                return {
                    received: true
                }
            }

            const paymentEntity =
                payload?.payload?.payment?.entity

            if (
                !paymentEntity ||
                !paymentEntity.id ||
                !paymentEntity.order_id
            ) {
                throw new Error(
                    'Malformed webhook payload'
                )
            }

            const {
                payment: Payment
            } = this.models

            const payment =
                await Payment.findOne({
                    where: {
                        gatewayOrderId:
                            paymentEntity.order_id
                    },
                    transaction,
                    lock:
                        transaction?.LOCK?.UPDATE
                })

            // Acknowledge but don't fail webhook
            if (!payment) {
                console.warn(
                    `[Webhook] Payment not found for order ${paymentEntity.order_id}`
                )

                return {
                    received: true
                }
            }

            // Idempotency
            if (
                payment.status ===
                'success'
            ) {
                return {
                    received: true
                }
            }

            switch (event) {
                case SUPPORTED_EVENTS.PAYMENT_CAPTURED:

                    await new ProcessSuccessfulPaymentService(
                        this.context
                    ).process(
                        payment,
                        {
                            gatewayPaymentId:
                                paymentEntity.id
                        }
                    )

                    break

                case SUPPORTED_EVENTS.PAYMENT_FAILED:

                    await payment.update(
                        {
                            status: 'failed'
                        },
                        { transaction }
                    )

                    break

                default:
                    break
            }

            return { received: true }

        } catch (error) {
            throw new APIError(error)
        }
    }
}