import dotenv from 'dotenv'
dotenv.config()

export const appConfig = {
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT
    },
    app: {
        name: process.env.APP_NAME,
        env: process.env.NODE_ENV
    },
    redis_db: {
        host: process.env.REDIS_DB_HOST,
        port: process.env.REDIS_DB_PORT,
        password: process.env.REDIS_DB_PASSWORD,
    },
    port: process.env.PORT,
}