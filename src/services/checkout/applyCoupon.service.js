import { ServiceBase } from '@src/lib/serviceBase'

export class ApplyCouponService extends ServiceBase {
  async apply(data) {
    const { couponCode, currentTotal = 0 } = data
    if (!couponCode) {
      throw new Error('couponCode is required')
    }

    const normalized = couponCode.toString().trim().toUpperCase()
    const response = {
      couponCode: normalized,
      discount: 0,
      total: Number(currentTotal)
    }

    if (normalized === 'DISCOUNT10') {
      response.discount = Number((response.total * 0.1).toFixed(2))
      response.total = Number((response.total - response.discount).toFixed(2))
    }

    return {
      message: 'Coupon applied successfully',
      data: response
    }
  }
}
