import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { GetCartService } from '@src/services/cart/getCart.service'
import { GetAllCartService } from '@src/services/cart/getAllCart.service'
import { AddToCartService } from '@src/services/cart/addToCart.service'
import { UpdateCartService } from '@src/services/cart/updateCart.service'
import { RemoveFromCartService } from '@src/services/cart/removeFromCart.service'
import { ClearAllItemsService } from '@src/services/cart/clearAllItems.service'
import { MergeCartService } from '@src/services/cart/mergeCart.service'
import {
  getCartSchema,
  getAllCartSchema,
  addToCartSchema,
  updateCartSchema,
  removeFromCartSchema,
  clearAllItemsSchema,
  cartMergeSchema
} from '@src/schemas/cart.schema'

export class CartController {

  static async getCart(req, res, next) {
    try {
      const result = await new GetCartService(req.context).get({ ...req.query, userId: req.user.id })
      validateResponse(getCartSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllCart(req, res, next) {
    try {
      const result = await new GetAllCartService(req.context).list({ ...req.query, userId: req.user.id })
      validateResponse(getAllCartSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async addToCart(req, res, next) {
    try {
      const result = await new AddToCartService(req.context).add({ ...req.body, userId: req.user.id })
      validateResponse(addToCartSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async updateCart(req, res, next) {
    try {
      const result = await new UpdateCartService(req.context).update({ ...req.body, userId: req.user.id })
      validateResponse(updateCartSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async removeFromCart(req, res, next) {
    try {
      const result = await new RemoveFromCartService(req.context).remove({ ...req.body, userId: req.user.id })
      validateResponse(removeFromCartSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async clearAllItems(req, res, next) {
    try {
      const result = await new ClearAllItemsService(req.context).clear({ ...req.body, userId: req.user.id })
      validateResponse(clearAllItemsSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async cartMerge(req, res, next) {
    try {
      const result = await new MergeCartService(req.context).merge({ ...req.body, userId: req.user.id })
      validateResponse(cartMergeSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
