import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class UpdateCouponService extends ServiceBase {
    async update(data) {
        const transaction = this.context.transaction

        try {
            const { coupon: Coupon } = this.models

            const coupon = await Coupon.findByPk(data.id)

            if (!coupon) {
                throw new Error('Coupon not found')
            }

            await coupon.update(data, { transaction })

            return {
                message: 'Coupon updated successfully',
                data: coupon
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}