import { ServiceBase } from '@src/lib/serviceBase'

export class LoginService extends ServiceBase {
  async login(data) {
    const { user: User } = this.models
    const { email, userName, password } = data

    if ((!email && !userName) || !password) {
      throw new Error('Email or username and password are required')
    }

    const where = email ? { email } : { userName }
    const user = await User.findOne({ where })

    if (!user || user.password !== password) {
      throw new Error('Invalid credentials')
    }

    await user.update({ lastLogin: new Date() })

    const result = user.toJSON()
    delete result.password

    return {
      message: 'Login successful',
      data: result
    }
  }
}
