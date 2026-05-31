export const decorateResponse = (req, res, next) => {

    res.success = (data = null, message = 'Success', statusCode = 200) => {
        return res.status(statusCode).json({
            success: true,
            message,
            data,
            traceId: req.context?.traceId
        })
    }

    res.error = (message = 'Error', statusCode = 500, errorCode = null) => {
        return res.status(statusCode).json({
            success: false,
            message,
            errorCode,
            traceId: req.context?.traceId
        })
    }

    next()
}