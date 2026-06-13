import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class ListCouponsService extends ServiceBase {
    async list() {
        try {
            const { coupon: Coupon } = this.models

            const coupons = await Coupon.findAll({
                order: [['createdAt', 'DESC']]
            })

            return {
                message: 'Coupons fetched successfully',
                data: coupons
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}