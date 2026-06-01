import { ServiceBase } from '@src/lib/serviceBase'

export class UpdateCartService extends ServiceBase {
  async update(data) {
    const { cartItem: CartItem } = this.models
    const { cartItemId, cartId, productId, quantity } = data

    if (!quantity || Number(quantity) < 1) {
      throw new Error('quantity must be provided and greater than zero')
    }

    const where = {}
    if (cartItemId) where.id = cartItemId
    if (cartId && productId) Object.assign(where, { cartId, productId })

    if (!Object.keys(where).length) {
      throw new Error('cartItemId or cartId and productId are required')
    }

    const item = await CartItem.findOne({ where })
    if (!item) {
      throw new Error('Cart item not found')
    }

    await item.update({ quantity })

    return {
      message: 'Cart item updated successfully',
      data: item
    }
  }
}
