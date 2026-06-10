import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'

export class GetUserProfileService extends ServiceBase {
  async get(data) {
    try {
      const { user: User } = this.models
      const userId = data

      const user = await User.findByPk(userId, {
        attributes: {
          exclude: ['password']
        }
      })

      if (!user) {
        return this.addError('UserDoesNotExistsErrorType')
      }

      return {
        message: 'Profile retrieved successfully',
        data: user
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}