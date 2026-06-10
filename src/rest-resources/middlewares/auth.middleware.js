import { verifyAccessToken } from '@src/utils/jwt'
import AuthenticationError from '@src/errors/authentication.error'

export const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader?.startsWith('Bearer ')) throw new AuthenticationError()

        const token = authHeader.split(' ')[1]
        if (!token) throw new AuthenticationError()

        const decoded = verifyAccessToken(token)

        req.user = decoded
        next()

    } catch (error) {
        next(new AuthenticationError())
    }
}
