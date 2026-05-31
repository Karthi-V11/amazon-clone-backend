export const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || 500

    const response = {
        success: false,
        name: err.name || 'Error',
        message: err.message || 'Internal Server Error',
        errorCode: err.errorCode || null
    }

    // show stack only in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack
    }

    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            success: false,
            message: err.errors.map(e => e.message)
        })
    }

    return res.status(statusCode).json(response)
}