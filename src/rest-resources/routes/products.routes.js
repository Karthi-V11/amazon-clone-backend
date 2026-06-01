import express from 'express'
import { ProductsController } from '../controllers/products.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  getAllProductsSchema,
  getSpecificProductSchema
} from '@src/schemas/products.schema'

const productsRouter = express.Router()

productsRouter.get('/', ajvValidate(getAllProductsSchema), ProductsController.getAllProducts)
productsRouter.get('/:id', ajvValidate(getSpecificProductSchema), ProductsController.getSpecificProduct)

export { productsRouter }
