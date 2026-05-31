import { appConfig } from './app.config'

export const redisOptions = {
    host: appConfig.redis_db.host,
    port: appConfig.redis_db.port,
    password: appConfig.redis_db.password,
}
