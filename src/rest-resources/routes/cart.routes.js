import express from 'express'
import { CartController } from '@src/rest-resources/controllers/cart.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { authMiddleware } from '@src/rest-resources/middlewares/auth.middleware'
import {
  getCartSchema,
  getAllCartSchema,
  addToCartSchema,
  updateCartSchema,
  removeFromCartSchema,
  clearAllItemsSchema,
  cartMergeSchema
} from '@src/schemas/cart.schema'
import { transactionMiddleware } from '../middlewares/transaction.middleware'

const cartRouter = express.Router()

cartRouter.get('/', authMiddleware, ajvValidate(getCartSchema), CartController.getCart)
cartRouter.get('/all', authMiddleware, ajvValidate(getAllCartSchema), CartController.getAllCart)

cartRouter.post('/add-to-cart', authMiddleware, ajvValidate(addToCartSchema), transactionMiddleware, CartController.addToCart)
cartRouter.post('/merge', authMiddleware, ajvValidate(cartMergeSchema), transactionMiddleware, CartController.cartMerge)
cartRouter.put('/update', authMiddleware, ajvValidate(updateCartSchema), transactionMiddleware, CartController.updateCart)

cartRouter.delete('/remove', authMiddleware, ajvValidate(removeFromCartSchema), transactionMiddleware, CartController.removeFromCart)
cartRouter.delete('/clear', authMiddleware, ajvValidate(clearAllItemsSchema), transactionMiddleware, CartController.clearAllItems)

export { cartRouter }
