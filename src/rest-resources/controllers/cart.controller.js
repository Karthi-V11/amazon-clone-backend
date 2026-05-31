import { decorateResponse } from '@src/helpers/response.helpers';
import { getCartService } from '@src/services/cart/getCart.service';
import { getAllCartService } from '@src/services/cart/getAllCart.service';
import { updateCartService } from '@src/services/cart/updateCart.service';
import { removeFromCartService } from '@src/services/cart/removeFromCart.service';
import { clearAllItemsService } from '@src/services/cart/clearAllItems.service';
import { cartMergeService } from '@src/services/cart/cartMerge.service';

export class CartController {
    static async getCart(req, res, next) {
        try {
            const result = await getCartService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllCart(req, res, next) {
        try {
            const result = await getAllCartService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async updateCart(req, res, next) {
        try {
            const result = await updateCartService({ ...req.params, ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async removeFromCart(req, res, next) {
        try {
            const result = await removeFromCartService({ ...req.params }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async clearAllItems(req, res, next) {
        try {
            const result = await clearAllItemsService({}, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async cartMerge(req, res, next) {
        try {
            const result = await cartMergeService({ ...req.body }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
