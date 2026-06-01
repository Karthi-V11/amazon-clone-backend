import { ServiceBase } from '@src/lib/serviceBase'

export class GetAllCartService extends ServiceBase {
  async list(data) {
    const { cart: Cart, cartItem: CartItem, product: Product, user: User } = this.models
    const { page = 1, limit = 20, status, userId } = data
    const where = {}

    if (status) where.status = status
    if (userId) where.userId = userId

    const offset = (Number(page) - 1) * Number(limit)
    const carts = await Cart.findAndCountAll({
      where,
      include: [
        { model: User, as: 'user', attributes: ['id', 'userName', 'email'] },
        {
          model: CartItem,
          as: 'items',
          include: [{ model: Product, as: 'product' }]
        }
      ],
      limit: Number(limit),
      offset,
      order: [['updatedAt', 'DESC']]
    })

    return {
      message: 'Carts retrieved successfully',
      data: {
        items: carts.rows,
        total: carts.count,
        page: Number(page),
        limit: Number(limit)
      }
    }
  }
}
