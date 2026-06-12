import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class GetCartService extends ServiceBase {
  async get(data) {
    try {
      const { cart: Cart, cartItem: CartItem, product: Product, user: User } = this.models
      const { cartId, userId } = data

      const where = {}

      if (cartId) where.id = cartId
      if (userId) where.userId = userId

      if (!Object.keys(where).length) return this.addError('CartIdOrUserIdRequiredErrorType')

      const cart = await Cart.findOne({
        where,
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'userName', 'email']
          },
          {
            model: CartItem,
            as: 'items',
            attributes: ['id', 'cartId', 'productId', 'quantity'],
            separate: true,
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'title', 'price', 'imageUrl', 'stockQuantity', 'brand']
              }
            ]
          }
        ]
      })

      if (!cart) return this.addError('CartNotFoundErrorType')

      let totalQuantity = 0
      let cartValue = 0

      const items = cart.items.map(item => {
        const price = Number(item.product?.price || 0)
        const quantity = Number(item.quantity || 0)

        const itemTotal = price * quantity

        totalQuantity += quantity
        cartValue += itemTotal

        return {
          ...item.toJSON(),
          itemTotal
        }
      })

      return {
        message: 'Cart retrieved successfully',
        data: {
          id: cart.id,
          userId: cart.userId,
          status: cart.status,
          user: cart.user,
          items,
          cartSummary: {
            totalItems: items.length,
            totalQuantity,
            cartValue
          }
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
