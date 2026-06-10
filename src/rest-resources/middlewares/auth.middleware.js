import { verifyAccessToken } from '@src/utils/jwt'
import AuthenticationError from '@src/errors/authentication.error'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) {
            console.log('No Authorization header')
            throw new AuthenticationError()
        }

        const token = authHeader.split(' ')[1]
        if (!token) throw new AuthenticationError()

        const decoded = verifyAccessToken(token)
        req.user = decoded
        next()

    } catch (error) {
        console.log('AUTH ERROR:', error.message)
        next(new AuthenticationError())
    }
}
