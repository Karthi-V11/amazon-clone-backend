import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class UpdateCartService extends ServiceBase {
  async update(data) {
    const transaction = this.context.transaction
    try {
      const { cartItem: CartItem, product: Product } = this.models
      const { cartItemId, cartId, productId, quantity } = data

      const qty = Number(quantity)

      if (!qty || qty < 1) return this.addError('InvalidQuantityErrorType')

      const where = {}

      if (cartItemId) {
        where.id = cartItemId
      } else if (cartId && productId) {
        where.cartId = cartId
        where.productId = productId
      } else {
        return this.addError('CartItemIdentifierRequiredErrorType')
      }

      const item = await CartItem.findOne({
        where,
        include: [
          {
            model: Product,
            as: 'product',
            attributes: ['id', 'title', 'price', 'imageUrl', 'stockQuantity', 'brand']
          }
        ]
      })

      if (!item) return this.addError('CartItemNotFoundErrorType')

      await item.update({ quantity: qty }, { transaction })

      const price = Number(item.product?.price || 0)
      const itemTotal = price * qty

      return {
        message: 'Cart item updated successfully',
        data: {
          ...item.toJSON(),
          itemTotal
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
