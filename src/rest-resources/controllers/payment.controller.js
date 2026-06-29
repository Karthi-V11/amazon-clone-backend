import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { CreatePaymentService } from '@src/services/payments/createPayment.service'
import { VerifyPaymentService } from '@src/services/payments/verifyPayment.service'
import { WebhookService } from '@src/services/payments/webhook.service'
import { createPaymentSchema, verifyPaymentSchema } from '@src/schemas/payment.schema'

export class PaymentController {

    static async createPayment(req, res, next) {
        try {
            const result = await new CreatePaymentService(req.context).create({ ...req.body, userId: req.user.id })
            validateResponse(createPaymentSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async verifyPayment(req, res, next) {
        try {
            const result = await new VerifyPaymentService(req.context).verify(req.body)
            validateResponse(verifyPaymentSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async webhook(req, res, next) {
        try {
            const result = await new WebhookService(req.context).process({
                rawBody: req.body,
                signature: req.headers['x-razorpay-signature'],
            })
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }
}