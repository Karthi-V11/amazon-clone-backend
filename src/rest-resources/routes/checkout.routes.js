import express from 'express';
import { CheckoutController } from '../controllers/checkout.controller';

const router = express.Router();

router.post('/apply-coupon', CheckoutController.applyCoupon);
router.post('/select-address', CheckoutController.selectAddress);
router.post('/delivery', CheckoutController.delivery);
router.post('/payment', CheckoutController.paymentOrder);

export const checkoutRoutes = router;
