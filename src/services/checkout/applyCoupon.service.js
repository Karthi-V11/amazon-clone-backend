import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class ApplyCouponService extends ServiceBase {
  async apply(data) {
    try {
      const {
        coupon: Coupon,
        checkout_session: CheckoutSession
      } = this.models

      const { couponCode, checkoutSessionId, userId } = data

      if (!couponCode || !checkoutSessionId) {
        throw new Error('couponCode and checkoutSessionId required')
      }

      const checkout = await CheckoutSession.findOne({
        where: { id: checkoutSessionId, userId }
      })

      if (!checkout) throw new Error('Checkout not found')

      // 1. Get coupon from DB
      const coupon = await Coupon.findOne({
        where: {
          code: couponCode.trim().toUpperCase(),
          isActive: true
        }
      })

      if (!coupon) {
        throw new Error('Invalid coupon')
      }

      // 2. Check expiry
      if (coupon.expiryDate && new Date() > coupon.expiryDate) {
        throw new Error('Coupon expired')
      }

      // 3. Check usage limit
      if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
        throw new Error('Coupon usage limit reached')
      }

      // 4. Check minimum order
      if (checkout.subtotal < coupon.minOrderAmount) {
        throw new Error(
          `Minimum order amount is ${coupon.minOrderAmount}`
        )
      }

      // 5. Calculate discount
      let discount = 0

      if (coupon.type === 'percentage') {
        discount = (checkout.subtotal * Number(coupon.value)) / 100
      } else {
        discount = Number(coupon.value)
      }

      // Cap max discount
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount
      }

      discount = Number(discount.toFixed(2))
      const total = Number((checkout.subtotal - discount).toFixed(2))

      // 6. Update checkout session
      await CheckoutSession.update(
        {
          couponCode: coupon.code,
          discount,
          total
        },
        { where: { id: checkoutSessionId } }
      )

      // 7. Increase usage count
      await Coupon.update(
        { usedCount: coupon.usedCount + 1 },
        { where: { id: coupon.id } }
      )

      return {
        message: 'Coupon applied successfully',
        data: {
          couponCode: coupon.code,
          discount,
          total
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
