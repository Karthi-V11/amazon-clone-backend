import { ServiceBase } from '@src/lib/serviceBase'

export class GetSpecificUserService extends ServiceBase {
  async get(data) {
    const { user: User } = this.models
    const { id, email, userName } = data
    const where = {}

    if (id) where.id = id
    if (email) where.email = email
    if (userName) where.userName = userName

    if (!Object.keys(where).length) {
      throw new Error('User identifier is required')
    }

    const user = await User.findOne({
      where,
      attributes: { exclude: ['password'] }
    })

    if (!user) {
      throw new Error('User not found')
    }

    return {
      message: 'User retrieved successfully',
      data: user
    }
  }
}
