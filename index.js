import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import { appConfig } from '@src/configs'
import { Logger } from '@src/libs/logger'
import { router } from '@src/rest-resources/routes'
import { errorHandler } from '@src/rest-resources/middlewares/errorHandler.middleware'
import { contextMiddleware } from '@src/rest-resources/middlewares/context.middleware'


(async () => {
    const port = appConfig.port
    const app = express()

    app.use(cors({
        origin: appConfig.cors,
        credentials: true
    }))
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(express.json({ limit: '1mb' }))
    app.use(express.urlencoded({ extended: true }))

    app.use(contextMiddleware)
    app.use(router)
    app.use(errorHandler)

    app.listen(port, () => {
        Logger.info(`Server running on ${port}`)
    })

});