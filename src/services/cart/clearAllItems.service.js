import { ServiceBase } from '@src/lib/serviceBase'

export class ClearAllItemsService extends ServiceBase {
  async clear(data) {
    const { cartItem: CartItem, cart: Cart } = this.models
    const { userId, cartId } = data

    if (!userId && !cartId) {
      throw new Error('userId or cartId is required')
    }

    const cart = cartId
      ? await Cart.findByPk(cartId)
      : await Cart.findOne({ where: { userId, status: 'active' } })

    if (!cart) {
      throw new Error('Cart not found')
    }

    await CartItem.destroy({ where: { cartId: cart.id } })

    return {
      message: 'Cart cleared successfully',
      data: null
    }
  }
}
