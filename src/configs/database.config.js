import { appConfig } from './app.config.js'

export const dbConfig = {
    database: appConfig.db.name,
    username: appConfig.db.user,
    password: appConfig.db.password,
    host: appConfig.db.host,
    port: appConfig.db.port,
    dialect: 'postgres',

    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    define: {
        underscored: false,
        timestamps: true
    },
    migrationStorage: 'sequelize',
    migrationStorageTableName: 'sequelize_migration_meta',
    seederStorage: 'sequelize',
    seederStorageTableName: 'sequelize_seed_meta'
}

export default {
    development: dbConfig,
    test: dbConfig,
    production: dbConfig
}