import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class MergeCartService extends ServiceBase {
  async merge(data) {
    const transaction = this.context.transaction

    try {
      const { cart: Cart, cartItem: CartItem, product: Product } = this.models
      const { userId, items = [] } = data

      if (!userId || !Array.isArray(items) || items.length === 0) {
        return this.addError('UserIdAndItemsRequiredErrorType')
      }

      let cart = await Cart.findOne({
        where: { userId, status: 'active' },
        transaction
      })

      if (!cart) {
        cart = await Cart.create(
          { userId, status: 'active' },
          { transaction }
        )
      }

      const skippedItems = []

      for (const item of items) {
        const { productId, quantity = 1 } = item

        if (!productId || quantity <= 0) {
          skippedItems.push({
            productId,
            reason: 'invalid input'
          })
          continue
        }

        const product = await Product.findByPk(productId, { transaction })

        if (!product) {
          skippedItems.push({
            productId,
            reason: 'product not found'
          })
          continue
        }

        if (!product.isActive || product.stockQuantity <= 0) {
          skippedItems.push({
            productId,
            reason: 'product inactive or out of stock'
          })
          continue
        }

        if (Number(quantity) > product.stockQuantity) {
          skippedItems.push({
            productId,
            reason: 'insufficient stock'
          })
          continue
        }

        const [cartItem] = await CartItem.findOrCreate({
          where: { cartId: cart.id, productId },
          defaults: { quantity },
          transaction
        })

        await cartItem.update(
          {
            quantity: cartItem.quantity + Number(quantity)
          },
          { transaction }
        )
      }

      const mergedCart = await Cart.findByPk(cart.id, {
        include: [
          {
            model: CartItem,
            as: 'items',
            include: [
              {
                model: Product,
                as: 'product'
              }
            ]
          }
        ],
        transaction
      })

      return {
        message: 'Cart merged successfully',
        data: {
          cart: mergedCart,
          skippedItems
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
