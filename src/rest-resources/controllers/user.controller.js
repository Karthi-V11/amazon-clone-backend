import { decorateResponse } from '@src/helpers/responseDecorator.helper'
import { validateResponse } from '@src/helpers/validateResponse.helper'
import { GetAllUsersService } from '@src/services/user/getAllUsers.service'
import { GetSpecificUserService } from '@src/services/user/getSpecificUser.service'
import { GetUserProfileService } from '@src/services/user/getUserProfile.service'
import { SignupService } from '@src/services/user/signup.service'
import { LoginService } from '@src/services/user/login.service'
import { GoogleSignupService } from '@src/services/user/googleSignupService'
import { LogoutService } from '@src/services/user/logout.service'
import {
  signupSchema,
  loginSchema,
  getAllUsersSchema,
  getSpecificUserSchema,
  logoutSchema
} from '@src/schemas/user.schema'

export class UserController {
  static async getSpecificUser(req, res, next) {
    try {
      const result = await new GetSpecificUserService(req.context).get({ ...req.query })
      validateResponse(getSpecificUserSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      const result = await new GetAllUsersService(req.context).list({ ...req.query })
      validateResponse(getAllUsersSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async getProfile(req, res, next) {
    try {
      const result = await new GetUserProfileService(req.context).get(req.user.id)
      // validateResponse(getAllUsersSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async signup(req, res, next) {
    try {
      const result = await new SignupService(req.context).signup({ ...req.body })
      validateResponse(signupSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const result = await new LoginService(req.context).login({ ...req.body })
      validateResponse(loginSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async googleSignup(req, res, next) {
    try {
      const result = await new GoogleSignupService(req.context).signup(req.body)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }

  static async logout(req, res, next) {
    try {
      const result = await new LogoutService(req.context).logout({ ...req.body })
      validateResponse(logoutSchema.response?.[200], result)
      return decorateResponse({ req, res, next }, result)
    } catch (error) {
      next(error)
    }
  }
}
