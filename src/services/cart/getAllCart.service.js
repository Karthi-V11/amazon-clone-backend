import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class GetAllCartService extends ServiceBase {
  async list(data) {
    try {
      const { cart: Cart, cartItem: CartItem, product: Product, user: User } = this.models
      const { status, userId } = data

      const where = {}
      const page = Number(data.page) || 1
      const limit = Number(data.limit) || 10
      if (status) where.status = status
      if (userId) where.userId = userId

      const offset = (Number(page) - 1) * Number(limit)

      const carts = await Cart.findAndCountAll({
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
            include: [
              {
                model: Product,
                as: 'product',
                attributes: ['id', 'title', 'price', 'imageUrl', 'stockQuantity', 'brand']
              }
            ]
          }
        ],
        limit: Number(limit),
        offset,
        order: [['updatedAt', 'DESC']],
        distinct: true
      })

      const formattedCarts = carts.rows.map(cart => {
        let cartTotal = 0
        let totalQuantity = 0

        const items = cart.items.map(item => {
          const price = Number(item.product.price)
          const quantity = Number(item.quantity)

          const itemTotal = price * quantity
          cartTotal += itemTotal
          totalQuantity += quantity

          return {
            ...item.toJSON(),
            itemTotal
          }
        })

        return {
          ...cart.toJSON(),
          items,
          cartSummary: {
            totalItems: items.length,
            totalQuantity,
            cartValue: cartTotal
          }
        }
      })

      return {
        message: 'Carts retrieved successfully',
        data: {
          items: formattedCarts,
          total: carts.count,
          page: Number(page),
          limit: Number(limit)
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}



// import { APIError } from '@src/errors/api.error'
// import { ServiceBase } from '@src/lib/serviceBase'

// export class GetAllCartService extends ServiceBase {
//   async list(data) {
//     try {
//       const { cart: Cart, cartItem: CartItem, product: Product, user: User } = this.models
//       const { page = 1, limit = 20, status, userId } = data
//       const where = {}

//       if (status) where.status = status
//       if (userId) where.userId = userId

//       const offset = (Number(page) - 1) * Number(limit)
//       const carts = await Cart.findAndCountAll({
//         where,
//         include: [
//           { model: User, as: 'user', attributes: ['id', 'userName', 'email'] },
//           {
//             model: CartItem,
//             as: 'items',
//             include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'imageUrl', 'price', 'stockQuantity'] }]
//           }
//         ],
//         limit: Number(limit),
//         offset,
//         order: [['updatedAt', 'DESC']],
//         distinct: true
//       })

//       return {
//         message: 'Carts retrieved successfully',
//         data: {
//           items: carts.rows,
//           total: carts.count,
//           page: Number(page),
//           limit: Number(limit)
//         }
//       }
//     } catch (error) {
//       throw new APIError(error)
//     }
//   }
// }
