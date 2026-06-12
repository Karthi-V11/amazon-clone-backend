import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

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

        if (product.stock < quantity) {
          throw new Error(
            `${product.name} has only ${product.stock} item(s) available`
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
          status: 'pending',
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




// import { ServiceBase } from '@src/lib/serviceBase'
// import { APIError } from '@src/errors/api.error'

// export class CreateOrderService extends ServiceBase {
//   async create(data) {
//     try {
//       const transaction = this.context.transaction
//       const { order: Order, orderItem: OrderItem, product: Product, address: Address } = this.models
//       const { userId, shippingAddressId, billingAddressId, items = [], paymentMethod, metadata } = data

//       if (!userId || !shippingAddressId || !billingAddressId || !items.length) {
//         throw new Error('userId, shippingAddressId, billingAddressId and items are required')
//       }

//       const shippingAddress = await Address.findOne({ where: { id: shippingAddressId, userId } })
//       const billingAddress = await Address.findOne({ where: { id: billingAddressId, userId } })
//       if (!shippingAddress || !billingAddress) {
//         throw new Error('Invalid shipping or billing address')
//       }

//       const productIds = items.map(item => item.productId)
//       const products = await Product.findAll({ where: { id: productIds } })
//       const productMap = products.reduce((map, product) => {
//         map[product.id] = product
//         return map
//       }, {})

//       let totalAmount = 0
//       const orderItems = []

//       for (const item of items) {
//         const product = productMap[item.productId]
//         if (!product) {
//           throw new Error(`Product not found: ${item.productId}`)
//         }
//         const price = Number(product.price)
//         const quantity = Number(item.quantity)

//         if (!quantity || quantity < 1) {
//           throw new Error('Invalid quantity')
//         }
//         totalAmount += price * quantity
//         orderItems.push({ productId: product.id, quantity, priceAtPurchase: price })

//         if (product.stock < quantity) {
//           throw new Error(
//             `${product.name} is out of stock`
//           )
//         }
//       }

//       const order = await Order.create({
//         userId,
//         shippingAddressId,
//         billingAddressId,
//         totalAmount,
//         paymentMethod: paymentMethod || 'cod',
//         status: 'pending',
//         metadata
//       }, { transaction })

//       const itemsToCreate = orderItems.map(item => ({ ...item, orderId: order.id }))
//       await OrderItem.bulkCreate(itemsToCreate, { transaction })

//       await product.decrement('stock', { by: quantity, transaction })

//       return {
//         message: 'Order created successfully',
//         data: { orderId: order.id, totalAmount, status: order.status }
//       }
//     } catch (error) {
//       throw new APIError(error)
//     }
//   }
// }
