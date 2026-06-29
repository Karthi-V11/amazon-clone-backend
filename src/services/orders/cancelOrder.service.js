import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class CancelOrderService extends ServiceBase {
  async cancel(data) {
    try {
      const transaction = this.context.transaction
      const { order: Order } = this.models
      const { id, userId } = data

      if (!id) return this.addError('OrderIdRequiredErrorType')

      const order = await Order.findOne({
        where: { id, ...(userId ? { userId } : {}) }, transaction
      })

      if (!order) return this.addError('OrderNotFoundErrorType')

      if (order.status === 'cancelled') return this.addError('OrderAlreadyCancelledErrorType')

      const cancellableStatuses = ['pending_payment', 'paid', 'processing']

      if (!cancellableStatuses.includes(order.status)) return this.addError('OrderCannotBeCancelledErrorType')

      await order.update({ status: 'cancelled' }, { transaction })

      return {
        message: 'Order cancelled successfully', data: {
          id: order.id,
          status: order.status
        }
      }

    } catch (error) {
      throw new APIError(error)
    }
  }
}
