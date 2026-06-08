import { Op } from 'sequelize'
import { ServiceBase } from '@src/lib/serviceBase'

export class GetAllUsersService extends ServiceBase {
  async list(data) {
    try {
      const { user: User } = this.models
      const { page = 1, limit = 20, search, isActive } = data
      console.log("args:", data)

      const where = {}
      if (typeof isActive !== 'undefined') where.isActive = isActive
      if (search) {
        where[Op.or] = [
          { email: { [Op.iLike]: `%${search}%` } },
          { userName: { [Op.iLike]: `%${search}%` } },
          { firstName: { [Op.iLike]: `%${search}%` } },
          { lastName: { [Op.iLike]: `%${search}%` } }
        ]
      }

      const offset = (Number(page) - 1) * Number(limit)
      const users = await User.findAndCountAll({
        where,
        attributes: { exclude: ['password'] },
        limit: Number(limit),
        offset,
        order: [['createdAt', 'DESC']]
      })

      return {
        message: 'Users retrieved successfully',
        data: {
          items: users.rows,
          total: users.count,
          page: Number(page),
          limit: Number(limit)
        }
      }
    } catch (error) {
      console.log("🔥 SERVICE ERROR:", error)
      throw error
    }
  }
}
