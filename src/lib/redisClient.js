import Redis from 'ioredis'
import { redisOptions } from '@src/configs'
import parseDurationToMs from '@src/utils/conmon'

let redis = null

/**
 * Get or create a singleton Redis client
 */
export const getRedisClient = () => {
    if (!redis) {
        redis = new Redis({
            host: redisOptions.host || 'localhost',
            port: redisOptions.port || 6379,
            password: redisOptions.password || undefined,
            maxRetriesPerRequest: 3,
            retryStrategy(times) {
                if (times > 3) return null
                return Math.min(times * 200, 2000)
            }
        })

        redis.on('connect', () => console.log('Redis connected'))
        redis.on('error', (err) => console.error('Redis error:', err.message))
    }
    return redis
}

/**
 * Build the Redis key for a session
 * Pattern: session:<userId>:<jti>
 */
const buildKey = (userId, jti) => `session:${userId}:${jti}`

/**
 * Store a session in Redis
 * @param {number|string} userId
 * @param {string} jti - Unique session ID
 * @param {object} sessionData - { accessToken, refreshToken }
 * @param {string} ttlString - Duration string like '7d', '15m'
 */
export const setSession = async (userId, jti, sessionData, ttlString) => {
    const client = getRedisClient()
    const ttlMs = parseDurationToMs(ttlString)
    const ttlSeconds = Math.floor(ttlMs / 1000)

    await client.set(
        buildKey(userId, jti),
        JSON.stringify(sessionData),
        'EX',
        ttlSeconds
    )
}

/**
 * Get a session from Redis
 * @returns {object|null} The session data or null if expired/revoked
 */
export const getSession = async (userId, jti) => {
    const client = getRedisClient()
    const data = await client.get(buildKey(userId, jti))
    return data ? JSON.parse(data) : null
}

/**
 * Delete a specific session (logout from one device)
 */
export const deleteSession = async (userId, jti) => {
    const client = getRedisClient()
    await client.del(buildKey(userId, jti))
}

/**
 * Delete ALL sessions for a user (force logout from all devices)
 */
export const deleteAllUserSessions = async (userId) => {
    const client = getRedisClient()
    const keys = await client.keys(`session:${userId}:*`)
    if (keys.length > 0) {
        await client.del(...keys)
    }
    return keys.length
}
