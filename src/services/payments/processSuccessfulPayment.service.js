import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class ProcessSuccessfulPaymentService extends ServiceBase {
    async process(payment, payload = {}) {
        const transaction = this.context.transaction

        try {
            const {
                order: Order,
                orderItem: OrderItem,
                product: Product
            } = this.models

            // Idempotency
            if (payment.status === 'success') {
                return {
                    alreadyProcessed: true,
                    paymentId: payment.id,
                    orderId: payment.orderId
                }
            }

            const order = await Order.findByPk(
                payment.orderId,
                { transaction }
            )

            if (!order) {
                throw new Error('Order not found')
            }

            // Prevent invalid state transitions
            if (
                order.status !== 'pending_payment'
            ) {
                throw new Error(
                    `Invalid order state: ${order.status}`
                )
            }

            const orderItems =
                await OrderItem.findAll({
                    where: {
                        orderId: order.id
                    },
                    transaction
                })

            const productIds =
                orderItems.map(
                    item => item.productId
                )

            const products =
                await Product.findAll({
                    where: {
                        id: productIds
                    },
                    transaction
                })

            const productMap =
                products.reduce(
                    (acc, product) => {
                        acc[product.id] = product
                        return acc
                    },
                    {}
                )

            // Sanity check
            // Stock should already be deducted
            for (const item of orderItems) {
                const product =
                    productMap[item.productId]

                if (!product) {
                    throw new Error(
                        `Product not found: ${item.productId}`
                    )
                }

                if (
                    product.stockQuantity < 0
                ) {
                    throw new Error(
                        `${product.title} has invalid stock quantity`
                    )
                }
            }

            // Mark payment success
            await payment.update(
                {
                    status: 'success',
                    verifiedAt: new Date(),
                    ...payload
                },
                { transaction }
            )

            // Mark order paid
            await order.update(
                {
                    status: 'paid'
                },
                { transaction }
            )

            return {
                alreadyProcessed: false,
                paymentId: payment.id,
                orderId: order.id,
                paymentStatus: 'success',
                orderStatus: 'paid'
            }

        } catch (error) {
            throw new APIError(error)
        }
    }
}