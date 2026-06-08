import express from 'express'
import { productsRouter } from '@src/rest-resources/routes/products.routes'
import { userRouter } from '@src/rest-resources/routes/user.routes'
import { ordersRouter } from '@src/rest-resources/routes/orders.routes'
import { checkoutRouter } from '@src/rest-resources/routes/checkout.routes'
import { cartRouter } from '@src/rest-resources/routes/cart.routes'
import { addressRouter } from '@src/rest-resources/routes/address.routes'

export const router = express.Router()

router.use('/products', productsRouter)
router.use('/user', userRouter)
router.use('/orders', ordersRouter)
router.use('/checkout', checkoutRouter)
router.use('/cart', cartRouter)
router.use('/address', addressRouter)
