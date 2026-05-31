import { decorateResponse } from '@src/helpers/response.helpers';
import { createOrderService } from '@src/services/orders/createOrder.service';
import { getOrderService } from '@src/services/orders/getOrder.service';
import { getAllOrdersService } from '@src/services/orders/getAllOrders.service';
import { getOrdersHistoryService } from '@src/services/orders/getOrdersHistory.service';
import { cancelOrderService } from '@src/services/orders/cancelOrder.service';
import { updateStatusService } from '@src/services/orders/updateStatus.service';

export class OrdersController {
    static async createOrder(req, res, next) {
        try {
            const result = await createOrderService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getOrder(req, res, next) {
        try {
            const result = await getOrderService({ ...req.params }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllOrders(req, res, next) {
        try {
            const result = await getAllOrdersService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getOrdersHistory(req, res, next) {
        try {
            const result = await getOrdersHistoryService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async cancelOrder(req, res, next) {
        try {
            const result = await cancelOrderService({ ...req.params, ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const result = await updateStatusService({ ...req.params, ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
