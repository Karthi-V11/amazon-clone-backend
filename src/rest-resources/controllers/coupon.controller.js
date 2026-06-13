import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'

import { CreateCouponService } from '@src/services/coupon/createCoupon.service'
import { UpdateCouponService } from '@src/services/coupon/updateCoupon.service'
import { DeleteCouponService } from '@src/services/coupon/deleteCoupon.service'
import { GetCouponService } from '@src/services/coupon/getCoupon.service'
import { ListCouponsService } from '@src/services/coupon/listCoupons.service'
import { ValidateCouponService } from '@src/services/coupon/validateCoupon.service'
import {
    createCouponSchema,
    updateCouponSchema,
    deleteCouponSchema,
    getCouponSchema,
    listCouponsSchema,
    validateCouponSchema
} from '@src/schemas/coupon.schema'

export class CouponController {
    static async create(req, res, next) {
        try {
            const result = await new CreateCouponService(req.context).create(req.body)
            validateResponse(createCouponSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next) {
        try {
            const result = await new UpdateCouponService(req.context).update(req.body)
            validateResponse(updateCouponSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async delete(req, res, next) {
        try {
            const result = await new DeleteCouponService(req.context).delete(req.body)
            validateResponse(deleteCouponSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async get(req, res, next) {
        try {
            const result = await new GetCouponService(req.context).get(req.query)
            validateResponse(getCouponSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async list(req, res, next) {
        try {
            const result = await new ListCouponsService(req.context).list(req.query)
            validateResponse(listCouponsSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }

    static async validate(req, res, next) {
        try {
            const result = await new ValidateCouponService(req.context).validate(req.body)
            validateResponse(validateCouponSchema.response?.[200], result)
            return decorateResponse({ req, res, next }, result)
        } catch (error) {
            next(error)
        }
    }
}