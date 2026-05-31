import express from 'express';
import { CartController } from '../controllers/cart.controller';

const router = express.Router();

router.get('/', CartController.getCart);
router.get('/all', CartController.getAllCart);
router.put('/:id', CartController.updateCart);
router.delete('/:id', CartController.removeFromCart);
router.delete('/clear', CartController.clearAllItems);
router.post('/merge', CartController.cartMerge);

export const cartRoutes = router;
