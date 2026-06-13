import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class ValidateCouponService extends ServiceBase {
    async validate(data) {
        try {
            const {
                coupon: Coupon,
                checkout_session: CheckoutSession
            } = this.models

            const {
                couponCode,
                checkoutSessionId,
                userId
            } = data

            const checkout = await CheckoutSession.findOne({
                where: {
                    id: checkoutSessionId,
                    userId
                }
            })

            if (!checkout) {
                throw new Error('Checkout session not found')
            }

            const coupon = await Coupon.findOne({
                where: {
                    code: couponCode.toUpperCase(),
                    isActive: true
                }
            })

            if (!coupon) {
                throw new Error('Invalid coupon')
            }

            if (
                coupon.expiryDate &&
                new Date() > coupon.expiryDate
            ) {
                throw new Error('Coupon expired')
            }

            if (
                coupon.usageLimit &&
                coupon.usedCount >= coupon.usageLimit
            ) {
                throw new Error('Coupon limit exceeded')
            }

            if (
                Number(checkout.subtotal) <
                Number(coupon.minOrderAmount)
            ) {
                throw new Error(
                    `Minimum order amount is ${coupon.minOrderAmount}`
                )
            }

            let discount = 0

            if (coupon.type === 'percentage') {
                discount =
                    (Number(checkout.subtotal) *
                        Number(coupon.value)) /
                    100

                if (
                    coupon.maxDiscount &&
                    discount > Number(coupon.maxDiscount)
                ) {
                    discount = Number(coupon.maxDiscount)
                }
            } else {
                discount = Number(coupon.value)
            }

            discount = Number(discount.toFixed(2))

            const total = Number(
                (Number(checkout.subtotal) - discount).toFixed(2)
            )

            await checkout.update({
                couponCode: coupon.code,
                discount,
                total
            })

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