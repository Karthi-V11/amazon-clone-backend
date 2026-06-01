import { Op } from 'sequelize'
import { ServiceBase } from '@src/lib/serviceBase'

export class SignupService extends ServiceBase {
  async signup(data) {
    const { user: User } = this.models
    const { email, userName, password, phone, firstName, lastName, gender } = data

    if (!email || !userName || !password || !phone) {
      throw new Error('email, userName, password and phone are required')
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [
          { email },
          { userName }
        ]
      }
    })

    if (existingUser) {
      throw new Error('A user with this email or username already exists')
    }

    const user = await User.create({
      email,
      userName,
      password,
      phone,
      firstName,
      lastName,
      gender
    })

    const result = user.toJSON()
    delete result.password

    return {
      message: 'Signup successful',
      data: result
    }
  }
}
