import jwt from 'jsonwebtoken'

const ACCESS_SECRET = process.env.JWT_SECRET
const ACCESS_EXPIRES = process.env.JWT_EXPIRES_IN || '15m'

// Sign an access token with a shared jti (session ID)
export const signAccessToken = (payload) => {
    return jwt.sign({ ...payload }, ACCESS_SECRET, { expiresIn: ACCESS_EXPIRES })
}

// Verify an access token
export const verifyAccessToken = (token) => {
    return jwt.verify(token, ACCESS_SECRET)
}
