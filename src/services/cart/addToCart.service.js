import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'

export class AddToCartService extends ServiceBase {
  async add(data) {
    try {
      const transaction = this.context.transaction
      const { cart: Cart, cartItem: CartItem, product: Product } = this.models
      const { userId, productId, quantity } = data

      if (!userId || !productId) return this.addError('UserIdAndProductIdRequiredErrorType')

      if (Number(quantity) <= 0) return this.addError('InvalidQuantityErrorType')

      const product = await Product.findByPk(productId)
      if (!product) return this.addError('ProductNotFoundErrorType')

      let cart = await Cart.findOne({ where: { userId, status: 'active' } })
      if (!cart) {
        cart = await Cart.create({ userId, status: 'active' }, { transaction })
      }

      const [item, created] = await CartItem.findOrCreate({
        where: { cartId: cart.id, productId },
        defaults: { quantity }
      }, { transaction })

      if (!created) {
        await item.update({ quantity: Number(item.quantity) + Number(quantity) }, { transaction })
      }

      await item.reload({ include: [{ model: Product, as: 'product', attributes: ['id', 'title', 'imageUrl', 'price', 'stockQuantity'] }] })

      return { message: 'Product added to cart successfully', data: item }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
