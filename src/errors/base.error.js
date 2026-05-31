export default class BaseError extends Error {
    constructor({ name, statusCode, isOperational, message, errorCode }) {
        super(message)

        Object.setPrototypeOf(this, new.target.prototype)

        this.name = name
        this.statusCode = statusCode
        this.isOperational = isOperational
        this.errorCode = errorCode

        Error.captureStackTrace(this)
    }
}