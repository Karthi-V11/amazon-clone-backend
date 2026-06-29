import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'
import { ORDER_STATUS } from '@src/utils/constants/public.constants'

export class CreateOrderService extends ServiceBase {
  async create(data) {
    const transaction = this.context.transaction

    try {
      const { order: Order, orderItem: OrderItem, product: Product, address: Address } = this.models
      const { userId, shippingAddressId, billingAddressId, items = [], paymentMethod, metadata } = data

      if (!userId || !shippingAddressId || !billingAddressId || !items.length) {
        throw new Error('userId, shippingAddressId, billingAddressId and items are required')
      }

      const shippingAddress = await Address.findOne({ where: { id: shippingAddressId, userId }, transaction })
      const billingAddress = await Address.findOne({ where: { id: billingAddressId, userId }, transaction })

      if (!shippingAddress || !billingAddress) throw new Error('Invalid shipping or billing address')

      const productIds = items.map(item => item.productId)

      const products = await Product.findAll({ where: { id: productIds }, transaction })

      if (products.length !== productIds.length) throw new Error('One or more products not found')

      const productMap = products.reduce((map, product) => {
        map[product.id] = product
        return map
      }, {})

      let totalAmount = 0

      const orderItems = []
      const stockUpdates = []

      for (const item of items) {
        const product = productMap[item.productId]

        if (!product) throw new Error(`Product not found: ${item.productId}`)

        const quantity = Number(item.quantity)

        if (!quantity || quantity < 1) throw new Error(`Invalid quantity for product ${item.productId}`)

        const price = Number(product.price)

        if (product.stockQuantity < quantity) {
          throw new Error(
            `${product.title} has only ${product.stockQuantity} item(s) available`
          )
        }

        totalAmount += price * quantity

        orderItems.push({
          productId: product.id,
          productName: product.title,
          productImage: product.imageUrl,
          productBrand: product.brand,
          quantity,
          priceAtPurchase: price
        })

        stockUpdates.push({ product, quantity })
      }

      const order = await Order.create(
        {
          userId,
          shippingAddressId,
          billingAddressId,
          totalAmount,
          paymentMethod: paymentMethod || 'cod',
          status: ORDER_STATUS.PENDING_PAYMENT,
          metadata
        },
        { transaction }
      )

      const itemsToCreate = orderItems.map(item => ({ ...item, orderId: order.id }))

      await OrderItem.bulkCreate(itemsToCreate, { transaction })

      for (const stockUpdate of stockUpdates) {
        await stockUpdate.product.decrement('stockQuantity', { by: stockUpdate.quantity, transaction })
      }

      return {
        message: 'Order created successfully',
        data: {
          orderId: order.id,
          totalAmount,
          status: order.status,
          items: itemsToCreate,
          shippingAddress: shippingAddress,
          billingAddress: billingAddress
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
