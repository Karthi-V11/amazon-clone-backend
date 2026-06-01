import { ServiceBase } from '@src/lib/serviceBase'

export class CartMergeService extends ServiceBase {
  async merge(data) {
    const { cart: Cart, cartItem: CartItem, product: Product } = this.models
    const { userId, items = [] } = data

    if (!userId || !Array.isArray(items) || !items.length) {
      throw new Error('userId and items are required')
    }

    let cart = await Cart.findOne({ where: { userId, status: 'active' } })
    if (!cart) {
      cart = await Cart.create({ userId, status: 'active' })
    }

    for (const item of items) {
      const { productId, quantity = 1 } = item
      const product = await Product.findByPk(productId)
      if (!product) {
        continue
      }

      const [cartItem, created] = await CartItem.findOrCreate({
        where: { cartId: cart.id, productId },
        defaults: { quantity }
      })

      if (!created) {
        await cartItem.update({ quantity: cartItem.quantity + Number(quantity) })
      }
    }

    const mergedCart = await Cart.findByPk(cart.id, {
      include: [{ model: CartItem, as: 'items', include: [{ model: Product, as: 'product' }] }]
    })

    return {
      message: 'Cart merged successfully',
      data: mergedCart
    }
  }
}
