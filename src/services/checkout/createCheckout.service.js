import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class CreateCheckoutService extends ServiceBase {
  async create(data) {
    const transaction = this.context.transaction
    try {
      const { cart: Cart, cartItem: CartItem, product: Product, address: Address, checkout_session: CheckoutSession } = this.models
      const { userId, shippingAddressId, billingAddressId, cartId, couponCode } = data
      const idempotencyKey = data.key

      if (!idempotencyKey) {
        return this.addError("MissingIdempotencyKeyErrorType")
      }
      else {
        const existing = await CheckoutSession.findOne({ where: { idempotencyKey }, transaction })

        if (existing) {
          return {
            message: 'Checkout already exists (idempotent)',
            data: {
              checkoutSessionId: existing.id,
              subtotal: existing.subtotal,
              discount: existing.discount,
              total: existing.total,
              status: existing.status
            }
          }
        }
      }

      if (!userId) return this.addError("UserNotFoundErrorType")
      if (!shippingAddressId || !billingAddressId) return this.addError("InvalidShippingOrBillingAddressErrorType")

      const [shippingAddress, billingAddress] = await Promise.all([
        Address.findOne({ where: { id: shippingAddressId, userId }, transaction }),
        Address.findOne({ where: { id: billingAddressId, userId }, transaction })
      ])

      if (!shippingAddress || !billingAddress) return this.addError("InvalidShippingOrBillingAddressErrorType")

      const cart = cartId
        ? await Cart.findByPk(cartId, {
          transaction,
          lock: transaction.LOCK.UPDATE
        })
        : await Cart.findOne({
          where: { userId, status: 'active' },
          transaction,
          lock: transaction.LOCK.UPDATE
        })

      if (!cart) throw new Error('Cart not found')

      // prevent double processing
      if (cart.isLocked) throw new Error('Cart is already being processed')

      await cart.update({ isLocked: true }, { transaction })
      const cartItems = await CartItem.findAll({ where: { cartId: cart.id }, transaction })

      if (!cartItems.length) return this.addError("CartItemNotFoundErrorType")

      const productIds = cartItems.map(i => i.productId)

      const products = await Product.findAll({
        where: { id: productIds },
        transaction,
        lock: transaction.LOCK.UPDATE
      })

      const productMap = products.reduce((acc, p) => { acc[p.id] = p; return acc }, {})

      console.log("CART:", cart)
      console.log("CART ITEMS:", cartItems)
      const items = []
      let subtotal = 0

      for (const item of cartItems) {
        const product = productMap[item.productId]

        if (!product) throw new Error(`Product ${item.productId} not found`)
        if (product.stock < item.quantity) throw new Error(`Insufficient stock for product ${product.id}`)

        const price = Number(product.price)
        subtotal += price * item.quantity
        items.push({ productId: product.id, quantity: item.quantity, price })
      }

      let discount = 0
      if (couponCode === 'DISCOUNT10') discount = subtotal * 0.1

      discount = Number(discount.toFixed(2))
      const total = Number((subtotal - discount).toFixed(2))

      const checkoutSession = await CheckoutSession.create(
        {
          userId,
          cartId: cart.id,
          itemsSnapshot: items,
          subtotal,
          discount,
          total,
          shippingAddressId,
          billingAddressId,
          couponCode: couponCode || null,
          status: 'created',
          expiresAt: new Date(Date.now() + 30 * 60 * 1000),
          idempotencyKey: idempotencyKey || null
        },
        { transaction }
      )

      await cart.update({ isLocked: false }, { transaction })

      return {
        message: 'Checkout created successfully',
        data: {
          checkoutSessionId: checkoutSession.id,
          subtotal,
          discount,
          total,
          currency: 'INR',
          status: checkoutSession.status
        }
      }

    } catch (error) {
      throw new APIError(error)
    }
  }
}
