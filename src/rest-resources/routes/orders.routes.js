import express from 'express'
import { OrdersController } from '../controllers/orders.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  createOrderSchema,
  getOrderSchema,
  getAllOrdersSchema,
  getOrdersHistorySchema,
  cancelOrderSchema,
  updateStatusSchema
} from '@src/schemas/orders.schema'

const ordersRouter = express.Router()

ordersRouter.post('/', ajvValidate(createOrderSchema), OrdersController.createOrder)
ordersRouter.get('/:id', ajvValidate(getOrderSchema), OrdersController.getOrder)
ordersRouter.get('/all', ajvValidate(getAllOrdersSchema), OrdersController.getAllOrders)
ordersRouter.get('/history', ajvValidate(getOrdersHistorySchema), OrdersController.getOrdersHistory)
ordersRouter.post('/:id/cancel', ajvValidate(cancelOrderSchema), OrdersController.cancelOrder)
ordersRouter.put('/:id/status', ajvValidate(updateStatusSchema), OrdersController.updateStatus)

export { ordersRouter }
