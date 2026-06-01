import { ServiceBase } from '@src/lib/serviceBase'

export class UpdateStatusService extends ServiceBase {
  async update(data) {
    const { order: Order } = this.models
    const { id, status } = data

    if (!id || !status) {
      throw new Error('Order id and status are required')
    }

    const order = await Order.findByPk(id)
    if (!order) {
      throw new Error('Order not found')
    }

    await order.update({ status })

    return {
      message: 'Order status updated successfully',
      data: order
    }
  }
}
