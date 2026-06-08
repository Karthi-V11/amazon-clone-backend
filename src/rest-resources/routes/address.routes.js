import express from 'express'
import { AddressController } from '@src/rest-resources/controllers/address.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { addAddressSchema, getAddressSchema } from '@src/schemas/address.schema'
import { transactionMiddleware } from '@src/rest-resources/middlewares/transaction.middleware'

const addressRouter = express.Router()

addressRouter.post('/create', ajvValidate(addAddressSchema), transactionMiddleware, AddressController.addAddress)
addressRouter.get('/get-all', ajvValidate(getAddressSchema), AddressController.getAddress)

export { addressRouter }
