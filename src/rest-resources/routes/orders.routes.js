import express from 'express';
import { OrdersController } from '../controllers/orders.controller';

const router = express.Router();

router.post('/', OrdersController.createOrder);
router.get('/:id', OrdersController.getOrder);
router.get('/all', OrdersController.getAllOrders);
router.get('/history', OrdersController.getOrdersHistory);
router.post('/:id/cancel', OrdersController.cancelOrder);
router.put('/:id/status', OrdersController.updateStatus);

export const ordersRoutes = router;
