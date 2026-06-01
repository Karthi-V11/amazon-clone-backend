import { ServiceBase } from '@src/lib/serviceBase'

export class GetOrderService extends ServiceBase {
  async get(data) {
    const { order: Order, orderItem: OrderItem, product: Product, address: Address, user: User } = this.models
    const { id, userId } = data

    if (!id) {
      throw new Error('Order id is required')
    }

    const order = await Order.findOne({
      where: { id, ...(userId ? { userId } : {}) },
      include: [
        { model: User, as: 'user', attributes: ['id', 'userName', 'email'] },
        { model: Address, as: 'shippingAddress' },
        { model: Address, as: 'billingAddress' },
        { model: OrderItem, as: 'items', include: [{ model: Product, as: 'product' }] }
      ]
    })

    if (!order) {
      throw new Error('Order not found')
    }

    return {
      message: 'Order retrieved successfully',
      data: order
    }
  }
}
