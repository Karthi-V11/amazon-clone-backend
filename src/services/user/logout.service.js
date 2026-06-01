import { ServiceBase } from '@src/lib/serviceBase'

export class LogoutService extends ServiceBase {
  async logout() {
    return {
      message: 'Logout successful',
      data: null
    }
  }
}
