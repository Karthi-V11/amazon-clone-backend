export const errorHandler = (err, req, res, next) => {

    const statusCode = err.statusCode || err.status || 500

    const response = {
        success: false,
        name: err.name || 'Error',
        message: err.message || 'Internal Server Error',
        errorCode: err.errorCode || null
    }

    if (err.errors) {
        response.errors = err.errors
    }

    if (err.fields) {
        response.fields = err.fields
    }

    // show stack only in development
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack
    }

    // if (err.name === 'SequelizeValidationError') {
    //     response.message = err.errors.map(e => e.message)
    //     return res.status(400).json(response)
    // }

    // SAFE Sequelize validation handling
    if (err.name === 'SequelizeValidationError' && Array.isArray(err.errors)) {
        response.message = err.errors.map(e => e.message)
        return res.status(400).json(response)
    }

    return res.status(statusCode).json(response)
}