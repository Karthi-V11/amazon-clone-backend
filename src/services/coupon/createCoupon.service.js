import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class CreateCouponService extends ServiceBase {
    async create(data) {
        const transaction = this.context.transaction
        try {
            const { coupon: Coupon } = this.models

            const existingCoupon = await Coupon.findOne({
                where: { code: data.code.toUpperCase() }
            })

            if (existingCoupon) {
                throw new Error('Coupon already exists')
            }

            const coupon = await Coupon.create(
                {
                    ...data,
                    code: data.code.toUpperCase()
                },
                { transaction }
            )

            return {
                message: 'Coupon created successfully',
                data: coupon
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}