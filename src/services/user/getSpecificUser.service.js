import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error';

export class GetSpecificUserService extends ServiceBase {
  async get(data) {
    try {
      const { user: User } = this.models
      const { id, email, userName } = data
      const where = {}

      if (id != null) where.id = Number(id)
      if (email) where.email = email
      if (userName) where.userName = userName

      if (!Object.keys(where).length) {
        throw new Error('User identifier is required')
      }

      const user = await User.findOne({
        where,
        attributes: { exclude: ['password'] }
      })

      if (!user) return this.addError('UserDoesNotExistsErrorType')

      return {
        message: 'User retrieved successfully',
        data: user
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
