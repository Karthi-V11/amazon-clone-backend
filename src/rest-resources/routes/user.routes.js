import express from 'express'
import { UserController } from '@src/rest-resources/controllers/user.controller'
import { ajvValidate } from '@src/rest-resources/middlewares/ajvValidate.middleware'
import { authMiddleware } from '@src/rest-resources/middlewares/auth.middleware'
import { transactionMiddleware } from '@src/rest-resources/middlewares/transaction.middleware'
import { signupSchema, loginSchema, getAllUsersSchema, getSpecificUserSchema, logoutSchema } from '@src/schemas/user.schema'

const userRouter = express.Router()

userRouter.get('/', authMiddleware, ajvValidate(getSpecificUserSchema), UserController.getSpecificUser)
userRouter.get('/all', authMiddleware, ajvValidate(getAllUsersSchema), UserController.getAllUsers)
userRouter.get('/profile', authMiddleware, ajvValidate({}), UserController.getProfile)

userRouter.post('/signup', ajvValidate(signupSchema), transactionMiddleware, UserController.signup)
userRouter.post('/login', ajvValidate(loginSchema), transactionMiddleware, UserController.login)
userRouter.post('/logout', authMiddleware, ajvValidate(logoutSchema), transactionMiddleware, UserController.logout)

export { userRouter }
