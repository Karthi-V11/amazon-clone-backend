import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class UpdateStatusService extends ServiceBase {
  async update(data) {
    try {
      const transaction = this.context.transaction
      const { order: Order } = this.models

      const { id, status } = data

      if (!id || !status) return this.addError('OrderIdAndStatusRequiredErrorType')

      const allowedStatuses = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

      if (!allowedStatuses.includes(status)) return this.addError('InvalidOrderStatusErrorType')

      const order = await Order.findByPk(id, { transaction })
      if (!order) return this.addError('OrderNotFoundErrorType')
      if (order.status === status) return this.addError('OrderAlreadyInSameStatusErrorType')
      const validTransitions = {
        pending: ['confirmed', 'cancelled'],
        confirmed: ['processing', 'cancelled'],
        processing: ['shipped'],
        shipped: ['delivered'],
        delivered: [],
        cancelled: []
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