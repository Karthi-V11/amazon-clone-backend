import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import { dbConfig } from '@src/configs/database.config'

// Create Sequelize instance
export const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: dbConfig.logging,
  define: dbConfig.define
})

// DB container
const db = {}

// Load models manually (simple & safe approach)
fs.readdirSync(__dirname)
  .filter((file) => file !== 'index.js' && file !== 'base.model.js' && file.endsWith('.model.js'))
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default

    model.init(sequelize)
    db[model.name] = model
  })
// console.log('Loaded models:', Object.keys(db))
// Run associations if available
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// Attach sequelize instance
db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
