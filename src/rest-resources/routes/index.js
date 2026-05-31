import express from 'express';
import { productsRoutes } from './products.routes';
import { userRoutes } from './user.routes';
import { ordersRoutes } from './orders.routes';
import { checkoutRoutes } from './checkout.routes';
import { cartRoutes } from './cart.routes';
import { addressRoutes } from './address.routes';

export const router = express.Router();

router.use('/products', productsRoutes);
router.use('/user', userRoutes);
router.use('/orders', ordersRoutes);
router.use('/checkout', checkoutRoutes);
router.use('/cart', cartRoutes);
router.use('/address', addressRoutes);
