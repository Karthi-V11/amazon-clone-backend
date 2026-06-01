import { ServiceBase } from '@src/lib/serviceBase'

export class DeliveryService extends ServiceBase {
  async choose(data) {
    const { method = 'standard' } = data
    const deliveryOptions = {
      standard: { label: 'Standard', cost: 5.0, estimatedDays: 5 },
      express: { label: 'Express', cost: 15.0, estimatedDays: 2 },
      overnight: { label: 'Overnight', cost: 25.0, estimatedDays: 1 }
    }

    if (!deliveryOptions[method]) {
      throw new Error('Unsupported delivery method')
    }

    return {
      message: 'Delivery option selected successfully',
      data: deliveryOptions[method]
    }
  }
}
