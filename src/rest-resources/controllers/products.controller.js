import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { GetAllProductsService } from '@src/services/products/getAllProducts.service'
import { GetSpecificProductService } from '@src/services/products/getSpecificProduct.service'
import {
  getAllProductsSchema,
  getSpecificProductSchema
} from '@src/schemas/products.schema'

export class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const result = await GetAllProductsService(req.context).list({ ...req.query })
      validateResponse(getAllProductsSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getSpecificProduct(req, res, next) {
    try {
      const result = await GetSpecificProductService(req.context).get({ ...req.params, ...req.query })
      validateResponse(getSpecificProductSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
