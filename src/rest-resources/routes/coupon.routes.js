import express from 'express'
import { CouponController } from '@src/rest-resources/controllers/coupon.controller'
import { authMiddleware } from '@src/rest-resources/middlewares/auth.middleware'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { transactionMiddleware } from '@src/rest-resources/middlewares/transaction.middleware'

import {
    createCouponSchema,
    updateCouponSchema,
    deleteCouponSchema,
    getCouponSchema,
    validateCouponSchema
} from '@src/schemas/coupon.schema'

const couponRouter = express.Router()

// Admin Routes
couponRouter.get('/get', authMiddleware, ajvValidate(getCouponSchema), CouponController.get)
couponRouter.get('/list', authMiddleware, CouponController.list)

couponRouter.post('/create', authMiddleware, ajvValidate(createCouponSchema), transactionMiddleware, CouponController.create)
couponRouter.put('/update', authMiddleware, ajvValidate(updateCouponSchema), transactionMiddleware, CouponController.update)
couponRouter.delete('/delete', authMiddleware, ajvValidate(deleteCouponSchema), transactionMiddleware, CouponController.delete)

// User Route
couponRouter.post('/validate', authMiddleware, ajvValidate(validateCouponSchema), CouponController.validate)

export { couponRouter }