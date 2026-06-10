import express from 'express'
import { ProductsController } from '@src/rest-resources/controllers/products.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { authMiddleware } from '@src/rest-resources/middlewares/auth.middleware'
import { getAllProductsSchema, getSpecificProductSchema } from '@src/schemas/products.schema'

const productsRouter = express.Router()

productsRouter.get('/', authMiddleware, ajvValidate(getSpecificProductSchema), ProductsController.getSpecificProduct)
productsRouter.get('/all', authMiddleware, ajvValidate(getAllProductsSchema), ProductsController.getAllProducts)
productsRouter.get('/reviews', authMiddleware, ajvValidate({}), ProductsController.getReviews)
productsRouter.post('/add-reviews', authMiddleware, ajvValidate({}), ProductsController.addReview)

export { productsRouter }
