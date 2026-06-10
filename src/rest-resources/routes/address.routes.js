import express from 'express'
import { AddressController } from '@src/rest-resources/controllers/address.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { addAddressSchema, getAddressSchema } from '@src/schemas/address.schema'
import { transactionMiddleware } from '@src/rest-resources/middlewares/transaction.middleware'
import { authMiddleware } from '@src/rest-resources/middlewares/auth.middleware'

const addressRouter = express.Router()

addressRouter.get('/get-all', authMiddleware, ajvValidate({}), AddressController.getAddress)
addressRouter.post('/create', authMiddleware, ajvValidate(addAddressSchema), transactionMiddleware, AddressController.addAddress)

export { addressRouter }
