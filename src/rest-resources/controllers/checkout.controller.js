import { decorateResponse } from '@src/helpers/response.helpers';
import { applyCouponService } from '@src/services/checkout/applyCoupon.service';
import { selectAddressService } from '@src/services/checkout/selectAddress.service';
import { deliveryService } from '@src/services/checkout/delivery.service';
import { paymentOrderService } from '@src/services/checkout/paymentOrder.service';

export class CheckoutController {
    static async applyCoupon(req, res, next) {
        try {
            const result = await applyCouponService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async selectAddress(req, res, next) {
        try {
            const result = await selectAddressService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async delivery(req, res, next) {
        try {
            const result = await deliveryService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async paymentOrder(req, res, next) {
        try {
            const result = await paymentOrderService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
