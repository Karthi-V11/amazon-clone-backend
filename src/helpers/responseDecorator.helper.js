import { getValidator } from "@src/lib/getValidator";

export const decorateResponse = (req, res, next) => {

    res.success = (data = null, message = 'Success', statusCode = 200, responseSchema) => {
        if (responseSchema) {
            const validator = getValidator({ body: responseSchema });
            if (!validator.body(data)) {
                // If response validation fails, log and send a generic error
                console.error('Response validation error', validator.body.errors);
                return res.status(500).json({
                    success: false,
                    message: 'Internal Server Error: response validation failed',
                    errors: validator.body.errors.map(e => ({ field: e.instancePath || e.params?.missingProperty || 'unknown', message: e.message })),
                    traceId: req.context?.traceId
                });
            }
        }
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