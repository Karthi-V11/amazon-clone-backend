import express from 'express'
import { productsRoutes } from '@src/rest-resources/routes/products.routes'
import { userRoutes } from '@src/rest-resources/routes/user.routes'
import { ordersRoutes } from '@src/rest-resources/routes/orders.routes'
import { checkoutRoutes } from '@src/rest-resources/routes/checkout.routes'
import { cartRoutes } from '@src/rest-resources/routes/cart.routes'
import { addressRoutes } from '@src/rest-resources/routes/address.routes'

export const router = express.Router()

router.use('/products', productsRoutes)
router.use('/user', userRoutes)
router.use('/orders', ordersRoutes)
router.use('/checkout', checkoutRoutes)
router.use('/cart', cartRoutes)
router.use('/address', addressRoutes)
