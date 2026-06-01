import { ServiceBase } from '@src/lib/serviceBase'

export class GetOrdersHistoryService extends ServiceBase {
  async history(data) {
    const { order: Order } = this.models
    const { userId, page = 1, limit = 20 } = data

    if (!userId) {
      throw new Error('userId is required')
    }

    const offset = (Number(page) - 1) * Number(limit)
    const orders = await Order.findAndCountAll({
      where: { userId },
      limit: Number(limit),
      offset,
      order: [['updatedAt', 'DESC']]
    })

    return {
      message: 'Order history retrieved successfully',
      data: {
        items: orders.rows,
        total: orders.count,
        page: Number(page),
        limit: Number(limit)
      }
    }
  }
}
