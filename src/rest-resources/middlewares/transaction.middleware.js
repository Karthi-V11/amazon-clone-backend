import { sequelize } from '../models/index.js'

export const transactionMiddleware = async (req, res, next) => {
    const transaction = await sequelize.transaction()

    req.transaction = transaction

    // if response success → commit
    const originalJson = res.json.bind(res)

    res.json = async (data) => {
        try {
            await transaction.commit()
            return originalJson(data)
        } catch (err) {
            await transaction.rollback()
            throw err
        }
    }

    // if error happens → rollback
    res.on('finish', async () => {
        if (!res.headersSent || res.statusCode >= 400) {
            await transaction.rollback()
        }
    })

    next()
}