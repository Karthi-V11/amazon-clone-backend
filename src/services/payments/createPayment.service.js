import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'
import { razorpay } from '@src/configs/razorpay.config'

export class CreatePaymentService extends ServiceBase {
    async create(data) {
        const transaction = this.context.transaction

        try {
            const { orderId, userId } = data
            const { order: Order, payment: Payment } = this.models

            // Fetch Order
            const order = await Order.findOne({
                where: {
                    id: orderId,
                    userId
                },
                transaction
            })

            if (!order) {
                throw new Error('Order not found')
            }

            // Prevent payment for completed orders
            const NON_PAYABLE_STATUSES = [
                'paid',
                'processing',
                'shipped',
                'delivered',
                'cancelled',
                'refunded'
            ]

            if (NON_PAYABLE_STATUSES.includes(order.status)) {
                throw new Error(
                    `Order cannot be paid. Current status: ${order.status}`
                )
            }

            if (!order.totalAmount || order.totalAmount <= 0) {
                throw new Error('Invalid order amount')
            }

            // Check existing payment
            const existingPayment = await Payment.findOne({
                where: {
                    orderId: order.id
                },
                order: [['createdAt', 'DESC']],
                transaction
            })

            // Already paid
            if (existingPayment?.status === 'success') {
                throw new Error('Order is already paid')
            }

            // Reuse pending payment
            if (
                existingPayment &&
                existingPayment.status === 'pending'
            ) {
                return {
                    message: 'Existing payment order found',
                    data: {
                        paymentId: existingPayment.id,
                        orderId: order.id,
                        amount: existingPayment.amount,
                        razorpayOrderId:
                            existingPayment.gatewayOrderId,
                        currency: existingPayment.currency
                    }
                }
            }

            // Create Razorpay order
            const razorpayOrder =
                await razorpay.orders.create({
                    amount: order.totalAmount * 100,
                    currency: 'INR',
                    receipt: `order_${order.id}`
                })

            // Create payment record
            const payment = await Payment.create(
                {
                    orderId: order.id,
                    amount: order.totalAmount,
                    currency: razorpayOrder.currency,
                    gateway: 'razorpay',
                    gatewayOrderId: razorpayOrder.id,
                    status: 'pending',
                    metadata: {
                        receipt: razorpayOrder.receipt
                    }
                },
                { transaction }
            )

            // Move order into payment stage
            if (order.status !== 'pending_payment') {
                await order.update(
                    {
                        status: 'pending_payment'
                    },
                    { transaction }
                )
            }

            return {
                message: 'Payment order created successfully',
                data: {
                    paymentId: payment.id,
                    orderId: order.id,
                    amount: payment.amount,
                    razorpayOrderId:
                        razorpayOrder.id,
                    currency:
                        razorpayOrder.currency,
                    key:
                        process.env.RAZORPAY_KEY_ID
                }
            }
        } catch (error) {
            throw new APIError(error)
        }
    }
}