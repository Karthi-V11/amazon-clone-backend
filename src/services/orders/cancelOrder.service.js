import { ServiceBase } from '@src/lib/serviceBase'

export class CancelOrderService extends ServiceBase {
  async cancel(data) {
    const { order: Order } = this.models
    const { id, userId } = data

    if (!id) {
      throw new Error('Order id is required')
    }

    const order = await Order.findOne({ where: { id, ...(userId ? { userId } : {}) } })
    if (!order) {
      throw new Error('Order not found')
    }

    if (order.status === 'cancelled') {
      return {
        message: 'Order is already cancelled',
        data: order
      }
    }

    await order.update({ status: 'cancelled' })

    return {
      message: 'Order cancelled successfully',
      data: order
    }
  }
}
