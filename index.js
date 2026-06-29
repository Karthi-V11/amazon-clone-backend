import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import express from 'express'
import { appConfig } from '@src/configs'
import { router } from '@src/rest-resources/routes'
import { errorHandler } from '@src/rest-resources/middlewares/errorHandler.middleware'
import { contextMiddleware } from '@src/rest-resources/middlewares/context.middleware'

  ; (async () => {
    const port = appConfig.port
    const app = express()
    console.log("SERVER INSTANCE STARTED AT:", new Date().toISOString())

    app.use((req, res, next) => {
      console.log("REQUEST HIT:", req.method, req.url)
      next()
    })
    console.log("CORS ORIGIN:", appConfig.cors)
    app.use(
      cors({
        origin: appConfig.cors,
        // origin: "http://localhost:5173",
        credentials: true
      })
    )
    app.use(helmet())
    app.use(morgan('tiny'))
    app.use(
      express.json({
        limit: '1mb',
        verify: (req, res, buf) => {
          req.rawBody = buf
        }
      })
    )
    app.use(express.urlencoded({ extended: true }))

    app.use(contextMiddleware)
    app.use(router)
    app.use(errorHandler)

    app.listen(port, () => {
      console.log(`Server running on ${port}`)
    })
  })()
