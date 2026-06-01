import { ServiceBase } from '@src/lib/serviceBase'

export class GetCartService extends ServiceBase {
  async get(data) {
    const { cart: Cart, cartItem: CartItem, product: Product, user: User } = this.models
    const { cartId, userId } = data
    const where = {}

    if (cartId) where.id = cartId
    if (userId) where.userId = userId

    if (!Object.keys(where).length) {
      throw new Error('cartId or userId is required')
    }

    const cart = await Cart.findOne({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'userName', 'email'] },
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ]
    })

    if (!cart) {
      throw new Error('Cart not found')
    }

    return {
      message: 'Cart retrieved successfully',
      data: cart
    }
  }
}
