import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetAllOrdersService extends ServiceBase {
  async list(data) {
    try {
      const { order: Order, user: User } = this.models
      const { page = 1, limit = 20, status, userId } = data

      const where = {}
      if (status) where.status = status
      if (userId) where.userId = userId

      const offset = (Number(page) - 1) * Number(limit)
      const orders = await Order.findAndCountAll({
        where,
        include: [{ model: User, as: 'user', attributes: ['id', 'userName', 'email'] }],
        limit: Number(limit),
        offset,
        order: [['createdAt', 'DESC']]
      })

      return {
        message: 'Orders retrieved successfully',
        data: {
          items: orders.rows,
          total: orders.count,
          page: Number(page),
          limit: Number(limit)
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
