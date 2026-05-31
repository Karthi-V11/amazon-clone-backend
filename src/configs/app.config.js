import {dotenv} from 'dotenv'
dotenv.config()

export const appConfig = {
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 5432
    },
    app: {
        name: process.env.APP_NAME,
        env: process.env.NODE_ENV || 'development'
    },
    redis_db:{
        host: process.env.REDIS_DB_HOST,
        port: process.env.REDIS_DB_PORT,
        password: process.env.REDIS_DB_PASSWORD,
    },
    port :process.env.PORT,
}