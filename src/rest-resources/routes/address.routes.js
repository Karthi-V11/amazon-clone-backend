import express from 'express';
import { AddressController } from '../controllers/address.controller';
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware';
import { addAddressSchema, getAddressSchema } from '@src/schemas/address.schema';
import { transactionMiddleware } from '../middlewares/transaction.middleware';

const router = express.Router();

router.post('/create', ajvValidate(addAddressSchema), transactionMiddleware, AddressController.addAddress);
router.get('/get-all', ajvValidate(getAddressSchema), AddressController.getAddress);

export const addressRoutes = router;
