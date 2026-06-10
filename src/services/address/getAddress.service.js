import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetAddressService extends ServiceBase {
  async list(data) {
    try {
      const { address: Address } = this.models
      const { userId, id, isDefault } = data

      const where = {}
      if (userId) where.userId = userId
      if (id) where.id = id
      if (typeof isDefault !== 'undefined') where.isDefault = isDefault

      if (!Object.keys(where).length) {
        throw new Error('At least one query field is required to fetch addresses')
      }

      const addresses = await Address.findAll({ where, order: [['updatedAt', 'DESC']] })

      return {
        message: 'Address(es) retrieved successfully',
        data: addresses
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
