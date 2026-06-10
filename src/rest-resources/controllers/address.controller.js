import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { AddAddressService } from '@src/services/address/addAddress.service'
import { GetAddressService } from '@src/services/address/getAddress.service'
import { addAddressSchema } from '@src/schemas/address.schema'
import { commonArrayResponseSchema } from '@src/schemas/common.schema'

export class AddressController {
  static async addAddress(req, res, next) {
    try {
      const result = await new AddAddressService(req.context).create({ ...req.body, userId: req.user.id })
      validateResponse(addAddressSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getAddress(req, res, next) {
    try {
      const result = await new GetAddressService(req.context).list({ userId: req.user.id })
      validateResponse(commonArrayResponseSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
