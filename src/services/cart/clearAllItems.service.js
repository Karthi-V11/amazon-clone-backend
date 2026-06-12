import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class ClearAllItemsService extends ServiceBase {
  async clear(data) {
    const transaction = this.context.transaction
    try {
      const { cartItem: CartItem, cart: Cart } = this.models
      const { userId, cartId } = data

      if (!userId && !cartId) return this.addError('CartIdOrUserIdRequiredErrorType')


      const cart = cartId
        ? await Cart.findOne({ where: { id: cartId } })
        : await Cart.findOne({ where: { userId, status: 'active' } })

      if (!cart) return this.addError('CartNotFoundErrorType')


      const itemCount = await CartItem.count({
        where: { cartId: cart.id }
      })

      if (itemCount === 0) {
        return {
          message: 'Cart is already empty',
          data: {
            cartId: cart.id,
            deletedItems: 0
          }
        }
      }

      const deletedCount = await CartItem.destroy({
        where: { cartId: cart.id },
        transaction
      })

      return {
        message: 'Cart cleared successfully',
        data: {
          cartId: cart.id,
          deletedItems: deletedCount
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
