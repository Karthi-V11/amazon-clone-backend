import express from 'express'
import { CartController } from '../controllers/cart.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  getCartSchema,
  getAllCartSchema,
  addToCartSchema,
  updateCartSchema,
  removeFromCartSchema,
  clearAllItemsSchema,
  cartMergeSchema
} from '@src/schemas/cart.schema'

const cartRouter = express.Router()

cartRouter.get('/', ajvValidate(getCartSchema), CartController.getCart)
cartRouter.get('/all-cart', ajvValidate(getAllCartSchema), CartController.getAllCart)
cartRouter.post('/add-to-cart', ajvValidate(addToCartSchema), CartController.addToCart)
cartRouter.put('/update', ajvValidate(updateCartSchema), CartController.updateCart)
cartRouter.delete('/remove', ajvValidate(removeFromCartSchema), CartController.removeFromCart)
cartRouter.delete('/clear', ajvValidate(clearAllItemsSchema), CartController.clearAllItems)
cartRouter.post('/merge', ajvValidate(cartMergeSchema), CartController.cartMerge)

export { cartRouter }
