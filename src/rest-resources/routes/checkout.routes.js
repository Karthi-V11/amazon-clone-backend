import express from 'express'
import { CheckoutController } from '../controllers/checkout.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  createCheckoutSchema,
  validateCheckoutSchema,
  applyCouponSchema,
  selectAddressSchema,
  deliverySchema,
  paymentOrderSchema
} from '@src/schemas/checkout.schema'

const checkoutRouter = express.Router()

checkoutRouter.post('/create', ajvValidate(createCheckoutSchema), CheckoutController.createCheckout)
checkoutRouter.post('/validate', ajvValidate(validateCheckoutSchema), CheckoutController.validateCheckout)
checkoutRouter.post('/apply-coupon', ajvValidate(applyCouponSchema), CheckoutController.applyCoupon)
checkoutRouter.post('/select-address', ajvValidate(selectAddressSchema), CheckoutController.selectAddress)
checkoutRouter.post('/delivery', ajvValidate(deliverySchema), CheckoutController.delivery)
checkoutRouter.post('/payment', ajvValidate(paymentOrderSchema), CheckoutController.paymentOrder)

export { checkoutRouter }
