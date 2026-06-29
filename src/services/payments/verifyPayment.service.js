import crypto from 'crypto'

import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'
import { appConfig } from '@src/configs/app.config'

export class VerifyPaymentService extends ServiceBase {
    async verify(data) {
        const transaction = this.context.transaction

        try {
            const {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature
            } = data

            const {
                payment: Payment,
                order: Order,
                orderItem: OrderItem,
                product: Product
            } = this.models

            // Find payment record
            const payment = await Payment.findOne({
                where: {
                    gatewayOrderId: razorpay_order_id
                },
                transaction
            })

            if (!payment) {
                throw new Error('Payment record not found')
            }

            // Idempotency protection
            if (payment.status === 'success') {
                return {
                    message: 'Payment already verified',
                    data: {
                        orderId: payment.orderId,
                        paymentId: payment.id,
                        status: payment.status
                    }
                }
            }

            if (payment.status !== 'pending') {
                throw new Error(
                    `Payment already processed with status ${payment.status}`
                )
            }

            // Verify signature
            const generatedSignature = crypto
                .createHmac(
                    'sha256',
                    appConfig.razorpay.keySecret
                )
                .update(
                    `${razorpay_order_id}|${razorpay_payment_id}`
                )
                .digest('hex')

            const generatedBuffer =
                Buffer.from(generatedSignature)

            const receivedBuffer =
                Buffer.from(razorpay_signature)

            if (
                generatedBuffer.length !==
                receivedBuffer.length
            ) {
                throw new Error(
                    'Invalid payment signature'
                )
            }

            const isValid =
                crypto.timingSafeEqual(
                    generatedBuffer,
                    receivedBuffer
                )

            if (!isValid) {
                throw new Error(
                    'Invalid payment signature'
                )
            }

            // Fetch order
            const order = await Order.findOne({
                where: {
                    id: payment.orderId
                },
                transaction
            })

            if (!order) {
                throw new Error('Order not found')
            }

            if (
                order.status !== 'pending_payment'
            ) {
                throw new Error(
                    `Order is in invalid state: ${order.status}`
                )
            }

            // Get order items
            const orderItems =
                await OrderItem.findAll({
                    where: {
                        orderId: order.id
                    },
                    transaction
                })

            // Final stock validation
            for (const item of orderItems) {
                const product =
                    await Product.findByPk(
                        item.productId,
                        { transaction }
                    )

                if (!product) {
                    throw new Error(
                        `Product not found: ${item.productId}`
                    )
                }

                if (
                    product.stockQuantity <
                    item.quantity
                ) {
                    throw new Error(
                        `${product.title} is out of stock`
                    )
                }
            }

            // Update payment
            await payment.update(
                {
                    gatewayPaymentId:
                        razorpay_payment_id,

                    gatewaySignature:
                        razorpay_signature,

                    status: 'success',

                    verifiedAt:
                        new Date()
                },
                { transaction }
            )

            // Update order
            await order.update(
                {
                    status: 'paid'
                },
                { transaction }
            )

            // Deduct inventory
            for (const item of orderItems) {
                await Product.decrement(
                    'stockQuantity',
                    {
                        by: item.quantity,
                        where: {
                            id: item.productId
                        },
                        transaction
                    }
                )
            }

            return {
                message:
                    'Payment verified successfully',
                data: {
                    paymentId: payment.id,
                    orderId: order.id,
                    paymentStatus: 'success',
                    orderStatus: 'paid'
                }
            }

        } catch (error) {
            throw new APIError(error)
        }
    }
}