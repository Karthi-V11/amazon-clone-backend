import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { GetAllProductsService } from '@src/services/products/getAllProducts.service'
import { GetSpecificProductService } from '@src/services/products/getSpecificProduct.service'
import { getAllProductsSchema, getSpecificProductSchema } from '@src/schemas/products.schema'
import { GetProductReviewsService } from '@src/services/products/getProductReviews.service'
import { AddProductReviewService } from '@src/services/products/addProductReview.service'

export class ProductsController {
  static async getAllProducts(req, res, next) {
    try {
      const result = await new GetAllProductsService(req.context).list({ ...req.query })
      validateResponse(getAllProductsSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getSpecificProduct(req, res, next) {
    try {
      const result = await new GetSpecificProductService(req.context).get({ ...req.query, userId: req.user.id })
      validateResponse(getSpecificProductSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getReviews(req, res, next) {
    try {
      const result = await new GetProductReviewsService(req.context).execute({ ...req.query, userId: req.user.id })
      // validateResponse(getSpecificProductSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async addReview(req, res, next) {
    try {
      const result = await new AddProductReviewService(req.context).add({ ...req.body, userId: req.user.id })
      // validateResponse(getSpecificProductSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
