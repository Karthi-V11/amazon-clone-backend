import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { APIError } from '@src/errors/api.error'
import { ServiceBase } from '@src/lib/serviceBase'
import AuthenticationError from '@src/errors/authentication.error'
import { signAccessToken, signRefreshToken } from '@src/utils/jwt'

export class LoginService extends ServiceBase {
  async login(data) {
    try {
      const { user: User } = this.models
      const transaction = this.context.transaction
      const identifier = data.email || data.userName

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: identifier?.toLowerCase() },
            { userName: identifier }
          ]
        }
      })

      if (!user) throw new AuthenticationError()

      const isMatch = await bcrypt.compare(data.password, user.password)
      if (!isMatch) return this.addError('UnauthorizedErrorType')

      const payload = {
        id: user.id,
        email: user.email
      }

      const accessToken = signAccessToken(payload)
      await user.update({ lastLogin: new Date() }, { transaction })
      // const refreshToken = signRefreshToken({ id: user.id })

      const { password, createdAt, updatedAt, ...safeUser } = user.toJSON()
      console.log("Login successful: ", accessToken);

      return {
        message: 'Login successful',
        data: {
          user: safeUser,
          accessToken,
          refreshToken: null
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}