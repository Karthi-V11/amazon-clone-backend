import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class DeliveryService extends ServiceBase {
  async choose(data) {
    const transaction = this.context.transaction
    try {
      const { checkout_session: CheckoutSession } = this.models
      const { userId, checkoutSessionId, method } = data
      const deliveryOptions = {
        standard: { label: 'Standard', cost: 5, estimatedDays: 5 },
        express: { label: 'Express', cost: 15, estimatedDays: 2 },
        overnight: { label: 'Overnight', cost: 25, estimatedDays: 1 }
      }

      const option = deliveryOptions[method]

      if (!option) return this.addError('DeliveryMethodNotFoundErrorType')

      const checkout = await CheckoutSession.findOne({ where: { id: checkoutSessionId, userId } })

      if (!checkout) return this.addError('CheckoutSessionNotFoundErrorType')

      const total = Number(checkout.total) + Number(option.cost)

      await checkout.update(
        {
          deliveryMethod: method,
          deliveryCost: option.cost,
          estimatedDeliveryDays: option.estimatedDays,
          total,
          status: 'delivery_selected'
        },
        { transaction }
      )

      return {
        message: 'Delivery option selected successfully',
        data: {
          method,
          deliveryCost: option.cost,
          total,
          status: 'delivery_selected'
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
