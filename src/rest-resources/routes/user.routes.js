import express from 'express'
import { UserController } from '@src/rest-resources/controllers/user.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import {
  signupSchema,
  loginSchema,
  getAllUsersSchema,
  getSpecificUserSchema,
  logoutSchema
} from '@src/schemas/user.schema'

const userRouter = express.Router()

userRouter.post('/signup', ajvValidate(signupSchema), UserController.signup)
userRouter.post('/login', ajvValidate(loginSchema), UserController.login)
userRouter.get('/all', ajvValidate(getAllUsersSchema), UserController.getAllUsers)
userRouter.get('/', ajvValidate(getSpecificUserSchema), UserController.getSpecificUser)
userRouter.post('/logout', ajvValidate(logoutSchema), UserController.logout)

export { userRouter }
