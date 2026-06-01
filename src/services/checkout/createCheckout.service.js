import { ServiceBase } from '@src/lib/serviceBase'

export class CreateCheckoutService extends ServiceBase {
  async create(data) {
    const { cart: Cart, cartItem: CartItem, product: Product, address: Address, order: Order, orderItem: OrderItem } = this.models
    const { userId, shippingAddressId, billingAddressId, cartId, paymentMethod, couponCode } = data

    if (!userId || !shippingAddressId || !billingAddressId) {
      throw new Error('userId, shippingAddressId and billingAddressId are required')
    }

    const shippingAddress = await Address.findOne({ where: { id: shippingAddressId, userId } })
    const billingAddress = await Address.findOne({ where: { id: billingAddressId, userId } })
    if (!shippingAddress || !billingAddress) {
      throw new Error('Invalid shipping or billing address')
    }

    const cart = cartId
      ? await Cart.findByPk(cartId, { include: [{ model: CartItem, as: 'items' }] })
      : await Cart.findOne({ where: { userId, status: 'active' }, include: [{ model: CartItem, as: 'items' }] })

    if (!cart || !cart.items.length) {
      throw new Error('Cart is empty')
    }

    const productIds = cart.items.map(item => item.productId)
    const products = await Product.findAll({ where: { id: productIds } })
    const productMap = products.reduce((map, product) => {
      map[product.id] = product
      return map
    }, {})

    let totalAmount = 0
    const orderItems = []

    for (const item of cart.items) {
      const product = productMap[item.productId]
      if (!product) continue
      const price = Number(product.price)
      totalAmount += price * item.quantity
      orderItems.push({ productId: item.productId, quantity: item.quantity, priceAtPurchase: price })
    }

    if (!orderItems.length) {
      throw new Error('Cart contains invalid products')
    }

    if (couponCode === 'DISCOUNT10') {
      totalAmount = Number((totalAmount * 0.9).toFixed(2))
    }

    const order = await Order.create({
      userId,
      shippingAddressId,
      billingAddressId,
      totalAmount,
      paymentMethod: paymentMethod || 'unknown',
      status: 'pending',
      metadata: { couponCode }
    })

    const itemsToCreate = orderItems.map(item => ({ ...item, orderId: order.id }))
    await OrderItem.bulkCreate(itemsToCreate)

    return {
      message: 'Checkout created successfully',
      data: { orderId: order.id, totalAmount, status: order.status }
    }
  }
}
