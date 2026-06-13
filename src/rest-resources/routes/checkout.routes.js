import express from 'express'
import { CheckoutController } from '@src/rest-resources/controllers/checkout.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  createCheckoutSchema,
  validateCheckoutSchema,
  applyCouponSchema,
  selectAddressSchema,
  deliverySchema
} from '@src/schemas/checkout.schema'
import { authMiddleware } from '../middlewares/auth.middleware'
import { transactionMiddleware } from '../middlewares/transaction.middleware'

const checkoutRouter = express.Router()

checkoutRouter.post('/create', authMiddleware, ajvValidate(createCheckoutSchema), transactionMiddleware, CheckoutController.createCheckout)
checkoutRouter.post('/validate', authMiddleware, ajvValidate(validateCheckoutSchema), transactionMiddleware, CheckoutController.validateCheckout)
checkoutRouter.post('/apply-coupon', authMiddleware, ajvValidate(applyCouponSchema), transactionMiddleware, CheckoutController.applyCoupon)
checkoutRouter.post('/select-address', authMiddleware, ajvValidate(selectAddressSchema), transactionMiddleware, CheckoutController.selectAddress)
checkoutRouter.post('/delivery', authMiddleware, ajvValidate(deliverySchema), transactionMiddleware, CheckoutController.delivery)

export { checkoutRouter }
