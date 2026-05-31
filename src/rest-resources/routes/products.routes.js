import express from 'express';
import { ProductsController } from '../controllers/products.controller';

const router = express.Router();

router.get('/', ProductsController.getAllProducts);
router.get('/:id', ProductsController.getSpecificProduct);

export const productsRoutes = router;
