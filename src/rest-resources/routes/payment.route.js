import express from 'express'
import { PaymentController } from '@src/rest-resources/controllers/payment.controller'
import { authMiddleware } from '../middlewares/auth.middleware'
import { transactionMiddleware } from '../middlewares/transaction.middleware'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { createPaymentSchema, verifyPaymentSchema } from '@src/schemas/payment.schema'

const paymentRouter = express.Router()

paymentRouter.post('/create-order', authMiddleware, ajvValidate(createPaymentSchema), transactionMiddleware, PaymentController.createPayment)
paymentRouter.post('/verify', authMiddleware, ajvValidate(verifyPaymentSchema), transactionMiddleware, PaymentController.verifyPayment)
paymentRouter.post('/webhook', express.raw({ type: 'application/json' }), transactionMiddleware, PaymentController.webhook)

export { paymentRouter }