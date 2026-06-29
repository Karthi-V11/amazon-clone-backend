import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class UpdateStatusService extends ServiceBase {
  async update(data) {
    try {
      const transaction = this.context.transaction
      const { order: Order } = this.models

      const { id, status } = data

      if (!id || !status) return this.addError('OrderIdAndStatusRequiredErrorType')

      const allowedStatuses = ['pending_payment', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']

      if (!allowedStatuses.includes(status)) return this.addError('InvalidOrderStatusErrorType')

      const order = await Order.findByPk(id, { transaction })
      if (!order) return this.addError('OrderNotFoundErrorType')
      if (order.status === status) return this.addError('OrderAlreadyInSameStatusErrorType')
      const validTransitions = {
        pending_payment: ['paid', 'cancelled'],
        paid: ['processing', 'cancelled', 'refunded'],
        processing: ['shipped', 'cancelled', 'refunded'],
        shipped: ['delivered'],
        delivered: [],
        cancelled: [],
        refunded: []
      }
      const nextStatuses = validTransitions[order.status] || []
      if (!nextStatuses.includes(status)) return this.addError('InvalidOrderStatusTransitionErrorType')

      await order.update({ status }, { transaction })

      return { message: 'Order status updated successfully' }
    } catch (error) {
      throw new APIError(error)
    }
  }
}