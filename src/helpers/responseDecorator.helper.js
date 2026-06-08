import { getValidator } from "@src/lib/getValidator";

export const decorateResponse = (reqOrContext, resOrResult, nextOrUndefined) => {
    let req, res, next, result;
    if (reqOrContext && reqOrContext.req && reqOrContext.res) {
        req = reqOrContext.req;
        res = reqOrContext.res;
        next = reqOrContext.next;
        result = resOrResult;
    } else {
        req = reqOrContext;
        res = resOrResult;
        next = nextOrUndefined;
    }

    if (res) {
        res.success = (data = null, message = 'Success', statusCode = 200, responseSchema) => {
            if (responseSchema) {
                const validator = getValidator({ body: responseSchema });
                if (!validator.body(data)) {
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
    }

    if (result && res) {
        return res.success(result.data, result.message, result.statusCode || 200)
    }

    if (next) {
        next()
    }
}