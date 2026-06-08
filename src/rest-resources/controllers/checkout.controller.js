import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { CreateCheckoutService } from '@src/services/checkout/createCheckout.service'
import { ValidateCheckoutService } from '@src/services/checkout/validateCheckout.service'
import { ApplyCouponService } from '@src/services/checkout/applyCoupon.service'
import { SelectAddressService } from '@src/services/checkout/selectAddress.service'
import { DeliveryService } from '@src/services/checkout/delivery.service'
import { PaymentOrderService } from '@src/services/checkout/paymentOrder.service'
import {
  createCheckoutSchema,
  validateCheckoutSchema,
  applyCouponSchema,
  selectAddressSchema,
  deliverySchema,
  paymentOrderSchema
} from '@src/schemas/checkout.schema'

export class CheckoutController {
  static async createCheckout(req, res, next) {
    try {
      const result = await CreateCheckoutService(req.context).create({ ...req.body })
      validateResponse(createCheckoutSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async validateCheckout(req, res, next) {
    try {
      const result = await ValidateCheckoutService(req.context).validate({ ...req.body })
      validateResponse(validateCheckoutSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async applyCoupon(req, res, next) {
    try {
      const result = await ApplyCouponService(req.context).apply({ ...req.body })
      validateResponse(applyCouponSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async selectAddress(req, res, next) {
    try {
      const result = await SelectAddressService(req.context).select({ ...req.body })
      validateResponse(selectAddressSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async delivery(req, res, next) {
    try {
      const result = await DeliveryService(req.context).choose({ ...req.body })
      validateResponse(deliverySchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async paymentOrder(req, res, next) {
    try {
      const result = await PaymentOrderService(req.context).pay({ ...req.body })
      validateResponse(paymentOrderSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
