import { sequelize } from '@src/database/models'
import { v4 as uuid } from 'uuid'

/**
 *Creates a context for keeping request track if included in a request
 * Attach context object in request object, context object will hold following properties
 * traceId - id of the request
 * sequelize - sequelize database connection
 * models - all sequelize models
 */
export function contextMiddleware(req, res, next) {
  req.context = {
    traceId: uuid(),
    startTime: Date.now(),
    locale: req.headers.locale || 'EN',
    sequelize,
    models: sequelize.models
  }

  req.authenticated = false

  next()
}