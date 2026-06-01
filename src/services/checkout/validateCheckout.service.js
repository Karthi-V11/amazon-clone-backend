import { ServiceBase } from '@src/lib/serviceBase'

export class ValidateCheckoutService extends ServiceBase {
  async validate(data) {
    const { cart: Cart, cartItem: CartItem, product: Product, address: Address } = this.models
    const { userId, shippingAddressId, billingAddressId, cartId } = data

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
    const missingProducts = productIds.filter(id => !products.some(product => product.id === id))

    if (missingProducts.length) {
      throw new Error(`Cart contains invalid products: ${missingProducts.join(', ')}`)
    }

    return {
      message: 'Checkout validated successfully',
      data: {
        shippingAddress,
        billingAddress,
        items: cart.items,
        totalItems: cart.items.length
      }
    }
  }
}
