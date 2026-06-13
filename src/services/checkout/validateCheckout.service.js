import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class ValidateCheckoutService extends ServiceBase {
  async validate(data) {
    try {
      const { cart: Cart, cartItem: CartItem, product: Product, address: Address, checkout_session: CheckoutSession } = this.models
      const { userId, shippingAddressId, billingAddressId, cartId, checkoutSessionId } = data

      if (!userId) return this.addError("UserNotFoundErrorType")
      if (!shippingAddressId || !billingAddressId) return this.addError("InvalidShippingOrBillingAddressErrorType")

      //  Validate addresses
      const [shippingAddress, billingAddress] = await Promise.all([
        Address.findOne({ where: { id: shippingAddressId, userId } }),
        Address.findOne({ where: { id: billingAddressId, userId } })
      ])

      if (!shippingAddress || !billingAddress) return this.addError("InvalidShippingOrBillingAddressErrorType")

      //  Get cart
      const cart = cartId
        ? await Cart.findByPk(cartId, { include: [{ model: CartItem, as: 'items' }] })
        : await Cart.findOne({
          where: { userId, status: 'active' },
          include: [{ model: CartItem, as: 'items' }]
        })

      if (!cart || !cart.items.length) return this.addError("CartItemNotFoundErrorType")

      // Load products
      const productIds = cart.items.map(i => i.productId)
      const products = await Product.findAll({ where: { id: productIds } })
      const productMap = products.reduce((acc, p) => { acc[p.id] = p; return acc }, {})

      //  Validate product + stock
      let totalQuantity = 0

      for (const item of cart.items) {
        const product = productMap[item.productId]

        if (!product) throw new Error(`Product ${item.productId} missing`)
        if (product.stock < item.quantity) throw new Error(`Insufficient stock for product ${product.id}`)

        totalQuantity += item.quantity
      }

      if (checkoutSessionId) {
        await CheckoutSession.update(
          { status: 'validated' },
          { where: { id: checkoutSessionId, userId } }
        )
      }

      return {
        message: 'Checkout validated successfully',
        data: {
          shippingAddressId,
          billingAddressId,
          totalItems: cart.items.length,
          totalQuantity,
          status: 'validated'
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
