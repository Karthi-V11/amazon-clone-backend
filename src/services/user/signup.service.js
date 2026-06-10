import bcrypt from 'bcryptjs'
import { Op } from 'sequelize'
import { ServiceBase } from '@src/lib/serviceBase'
import { APIError } from '@src/errors/api.error'
import { signAccessToken } from '@src/utils/jwt'

export class SignupService extends ServiceBase {
  async signup(data) {
    try {
      const transaction = this.context.transaction
      const { user: User } = this.models
      const { phone, firstName, lastName, gender } = data

      const email = data.email.toLowerCase().trim()
      const userName = data.userName.trim()


      const existingUser = await User.findOne({
        where: { [Op.or]: [{ email }, { userName }, { phone }] }
      })

      if (existingUser) {
        if (existingUser.email === email) return this.addError('EmailAlreadyExistsErrorType')
        if (existingUser.userName === userName) return this.addError('UserNameAlreadyExistsErrorType')
        if (existingUser.phone === phone) return this.addError('PhoneAlreadyExistsErrorType')
      }

      const hashedPassword = await bcrypt.hash(data.password, 10)

      const user = await User.create({
        email,
        userName,
        password: hashedPassword,
        phone,
        firstName,
        lastName,
        gender
      }, { transaction })

      const { password, ...safeUser } = user.toJSON()

      const accessToken = signAccessToken({ id: user.id, email: user.email })
      console.log('accessToken', accessToken);

      return {
        message: 'Signup successful',
        data: {
          user: safeUser,
          accessToken
        }
      }
    } catch (error) {
      throw new APIError(error)
    }
  }
}
