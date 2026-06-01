import { ServiceBase } from '@src/lib/serviceBase'

export class PaymentOrderService extends ServiceBase {
  async pay(data) {
    const { order: Order } = this.models
    const { orderId, paymentMethod, paymentReference } = data

    if (!orderId || !paymentMethod) {
      throw new Error('orderId and paymentMethod are required')
    }

    const order = await Order.findByPk(orderId)
    if (!order) {
      throw new Error('Order not found')
    }

    await order.update({
      paymentMethod,
      status: 'paid',
      metadata: { ...order.metadata, paymentReference }
    })

    return {
      message: 'Payment completed successfully',
      data: order
    }
  }
}
