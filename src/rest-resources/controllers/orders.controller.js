import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { CreateOrderService } from '@src/services/orders/createOrder.service'
import { GetOrderService } from '@src/services/orders/getOrder.service'
import { GetAllOrdersService } from '@src/services/orders/getAllOrders.service'
import { GetOrdersHistoryService } from '@src/services/orders/getOrdersHistory.service'
import { CancelOrderService } from '@src/services/orders/cancelOrder.service'
import { UpdateStatusService } from '@src/services/orders/updateStatus.service'
import { createOrderSchema, getOrderSchema, getAllOrdersSchema, getOrdersHistorySchema, cancelOrderSchema, updateStatusSchema } from '@src/schemas/orders.schema'

export class OrdersController {

  static async getOrder(req, res, next) {
    try {
      const result = await new GetOrderService(req.context).get({ ...req.query, userId: req.user.id })
      validateResponse(getOrderSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllOrders(req, res, next) {
    try {
      const result = await new GetAllOrdersService(req.context).list({ ...req.query, userId: req.user.id })
      validateResponse(getAllOrdersSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getOrdersHistory(req, res, next) {
    try {
      const result = await new GetOrdersHistoryService(req.context).history({ ...req.query, userId: req.user.id })
      validateResponse(getOrdersHistorySchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
  static async createOrder(req, res, next) {
    try {
      const result = await new CreateOrderService(req.context).create({ ...req.body, userId: req.user.id })
      validateResponse(createOrderSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const result = await new UpdateStatusService(req.context).update({ ...req.body, userId: req.user.id })
      validateResponse(updateStatusSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async cancelOrder(req, res, next) {
    try {
      const result = await new CancelOrderService(req.context).cancel({ ...req.body, userId: req.user.id })
      validateResponse(cancelOrderSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
