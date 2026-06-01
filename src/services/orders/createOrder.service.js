import { ServiceBase } from '@src/lib/serviceBase'

export class CreateOrderService extends ServiceBase {
  async create(data) {
    const { order: Order, orderItem: OrderItem, product: Product, address: Address } = this.models
    const { userId, shippingAddressId, billingAddressId, items = [], paymentMethod, metadata } = data

    if (!userId || !shippingAddressId || !billingAddressId || !items.length) {
      throw new Error('userId, shippingAddressId, billingAddressId and items are required')
    }

    const shippingAddress = await Address.findOne({ where: { id: shippingAddressId, userId } })
    const billingAddress = await Address.findOne({ where: { id: billingAddressId, userId } })
    if (!shippingAddress || !billingAddress) {
      throw new Error('Invalid shipping or billing address')
    }

    const productIds = items.map(item => item.productId)
    const products = await Product.findAll({ where: { id: productIds } })
    const productMap = products.reduce((map, product) => {
      map[product.id] = product
      return map
    }, {})

    let totalAmount = 0
    const orderItems = []

    for (const item of items) {
      const product = productMap[item.productId]
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`)
      }
      const price = Number(product.price)
      const quantity = Number(item.quantity) || 1
      totalAmount += price * quantity
      orderItems.push({ productId: product.id, quantity, priceAtPurchase: price })
    }

    const order = await Order.create({
      userId,
      shippingAddressId,
      billingAddressId,
      totalAmount,
      paymentMethod: paymentMethod || 'pending',
      status: 'pending',
      metadata
    })

    const itemsToCreate = orderItems.map(item => ({ ...item, orderId: order.id }))
    await OrderItem.bulkCreate(itemsToCreate)

    return {
      message: 'Order created successfully',
      data: { orderId: order.id, totalAmount, status: order.status }
    }
  }
}
