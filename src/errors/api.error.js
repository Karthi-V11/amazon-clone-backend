import { errorTypes } from '@src/utils/constants/error.constants'
import BaseError from './base.error'

export class APIError extends BaseError {
  constructor(errorObject) {
    if (errorObject instanceof BaseError) {
      super({
        name: errorObject.name,
        statusCode: errorObject.statusCode,
        isOperational: errorObject.isOperational,
        errorCode: errorObject.errorCode,
        message: errorObject.message,
        fields: errorObject.fields
      })
      return
    }

    const errorType = errorObject && typeof errorObject === 'object' && errorObject.statusCode
      ? errorObject
      : errorTypes.InternalServerErrorType

    super({
      name: errorObject?.name || errorType.name,
      statusCode: errorObject?.statusCode || errorType.statusCode,
      isOperational: typeof errorObject?.isOperational !== 'undefined' ? errorObject.isOperational : errorType.isOperational,
      errorCode: errorObject?.errorCode || errorType.errorCode,
      message: errorObject?.message || (typeof errorObject === 'string' ? errorObject : 'Internal Server Error'),
      fields: errorObject?.fields || null
    })
  }
}