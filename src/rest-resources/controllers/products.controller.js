import { decorateResponse } from '@src/helpers/response.helpers';
import { getAllProductsService } from '@src/services/products/getAllProducts.service';
import { getSpecificProductService } from '@src/services/products/getSpecificProduct.service';

export class ProductsController {
    static async getAllProducts(req, res, next) {
        try {
            const result = await getAllProductsService({ ...req.query }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }

    static async getSpecificProduct(req, res, next) {
        try {
            const result = await getSpecificProductService({ ...req.params }, req.context);
            return decorateResponse({ req, res, next }, result);
        } catch (error) {
            next(error);
        }
    }
}
