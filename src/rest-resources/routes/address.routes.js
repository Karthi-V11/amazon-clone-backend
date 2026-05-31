import express from 'express';
import { AddressController } from '../controllers/address.controller';

const router = express.Router();

router.post('/', AddressController.addAddress);
router.get('/', AddressController.getAddress);

export const addressRoutes = router;
