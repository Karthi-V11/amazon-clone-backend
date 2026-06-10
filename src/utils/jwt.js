import jwt from 'jsonwebtoken'
import { v4 as uuid } from 'uuid'

const ACCESS_SECRET = process.env.JWT_SECRET
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || '15m'
// const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET
// const REFRESH_EXPIRES = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'

// Sign an access token with a shared jti (session ID)
export const signAccessToken = (payload) => {
    return jwt.sign({ ...payload }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
}

// Verify an access token
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET)
}

// Sign a refresh token with the same jti
// export const signRefreshToken = (payload, jti) => {
//     return jwt.sign({ ...payload, jti }, REFRESH_SECRET, { expiresIn: REFRESH_EXPIRES })
// }

// Verify a refresh token
// export const verifyRefreshToken = (token) => {
//     return jwt.verify(token, REFRESH_SECRET)
// }

//  Generate a new unique session ID
// export const generateSessionId = () => uuid()
