import { ServiceBase } from '@src/lib/serviceBase'

export class AddToCartService extends ServiceBase {
  async add(data) {
    const { cart: Cart, cartItem: CartItem, product: Product } = this.models
    const { userId, productId, quantity = 1 } = data

    if (!userId || !productId) {
      throw new Error('userId and productId are required')
    }

    const product = await Product.findByPk(productId)
    if (!product) {
      throw new Error('Product not found')
    }

    let cart = await Cart.findOne({ where: { userId, status: 'active' } })
    if (!cart) {
      cart = await Cart.create({ userId, status: 'active' })
    }

    const [item, created] = await CartItem.findOrCreate({
      where: { cartId: cart.id, productId },
      defaults: { quantity }
    })

    if (!created) {
      await item.update({ quantity: item.quantity + Number(quantity) })
    }

    const currentCart = await Cart.findByPk(cart.id, {
      include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }]
    })

    return {
      message: 'Product added to cart successfully',
      data: currentCart
    }
  }
}
