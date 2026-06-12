import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class RemoveFromCartService extends ServiceBase {
  async remove(data) {
    const transaction = this.context.transaction
    try {
      const { cartItem: CartItem } = this.models
      const { cartItemId, cartId, productId } = data

      const where = {}

      if (cartItemId) {
        where.id = cartItemId
      } else if (cartId && productId) {
        where.cartId = cartId
        where.productId = productId
      } else {
        return this.addError('CartItemIdentifierRequiredErrorType')
      }

      const item = await CartItem.findOne({ where })

      if (!item) return this.addError('CartItemNotFoundErrorType')

      const deletedItem = {
        id: item.id,
        cartId: item.cartId,
        productId: item.productId,
        quantity: item.quantity
      }

      await item.destroy()

      return {
        message: 'Cart item removed successfully',
        data: deletedItem
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
