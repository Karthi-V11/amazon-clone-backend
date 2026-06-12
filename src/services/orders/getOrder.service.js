import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetOrderService extends ServiceBase {
  async get(data) {
    try {
      const { order: Order, orderItem: OrderItem, address: Address, user: User } = this.models
      const { id, userId } = data

      if (!id) return this.addError('OrderIdRequiredErrorType')

      const order = await Order.findOne({
        where: { id: Number(id), ...(userId ? { userId } : {}) },
        include: [
          { model: User, as: 'user', attributes: ['id', 'userName', 'email'] },
          { model: Address, as: 'shippingAddress', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: Address, as: 'billingAddress', attributes: { exclude: ['createdAt', 'updatedAt'] } },
          { model: OrderItem, as: 'items', attributes: ['productId', 'productName', 'productImage', 'productBrand', 'quantity', 'priceAtPurchase'] }
        ]
      })

      if (!order) return this.addError('OrderNotFoundErrorType')

      return {
        message: 'Order retrieved successfully',
        data: order
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
