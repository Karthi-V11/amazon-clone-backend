import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class DeleteCouponService extends ServiceBase {
    async delete(data) {
        const transaction = this.context.transaction

        try {
            const { coupon: Coupon } = this.models

            const coupon = await Coupon.findByPk(data.id)

            if (!coupon) {
                throw new Error('Coupon not found')
            }

            await coupon.update(
                {
                    isActive: false
                },
                { transaction }
            )

            return {
                message: 'Coupon disabled successfully'
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}