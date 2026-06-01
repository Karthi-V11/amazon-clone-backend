import { ServiceBase } from '@src/lib/serviceBase'

export class RemoveFromCartService extends ServiceBase {
  async remove(data) {
    const { cartItem: CartItem } = this.models
    const { cartItemId, cartId, productId } = data

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

    await item.destroy()

    return {
      message: 'Cart item removed successfully',
      data: null
    }
  }
}
