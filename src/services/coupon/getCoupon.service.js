import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class GetCouponService extends ServiceBase {
    async get(data) {
        try {
            const { coupon: Coupon } = this.models

            const coupon = await Coupon.findByPk(data.id)

            if (!coupon) {
                throw new Error('Coupon not found')
            }

            return {
                message: 'Coupon fetched successfully',
                data: coupon
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}