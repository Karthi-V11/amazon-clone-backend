import express from 'express'
import { OrdersController } from '@src/rest-resources/controllers/orders.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { createOrderSchema, getOrderSchema, getAllOrdersSchema, getOrdersHistorySchema, cancelOrderSchema, updateStatusSchema } from '@src/schemas/orders.schema'
import { authMiddleware } from '../middlewares/auth.middleware'
import { transactionMiddleware } from '../middlewares/transaction.middleware'

const ordersRouter = express.Router()

ordersRouter.get('/', authMiddleware, ajvValidate(getOrderSchema), OrdersController.getOrder)
ordersRouter.get('/all', authMiddleware, ajvValidate(getAllOrdersSchema), OrdersController.getAllOrders)
ordersRouter.get('/history', authMiddleware, ajvValidate(getOrdersHistorySchema), OrdersController.getOrdersHistory)

ordersRouter.post('/create', authMiddleware, ajvValidate(createOrderSchema), transactionMiddleware, OrdersController.createOrder)
ordersRouter.put('/status', authMiddleware, ajvValidate(updateStatusSchema), transactionMiddleware, OrdersController.updateStatus)
ordersRouter.post('/cancel', authMiddleware, ajvValidate(cancelOrderSchema), transactionMiddleware, OrdersController.cancelOrder)

export { ordersRouter }
