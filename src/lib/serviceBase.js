import { errorTypes } from '@src/utils/constants/error.constants'
import { APIError } from '@src/errors/api.error'

export class ServiceBase {
    constructor(context) {
        this.context = context;
        this.models = context.models;
        this.sequelize = context.sequelize;
        this.traceId = context.traceId;
    }

    addError(errorTypeName, message = null) {
        const errorType = errorTypes[errorTypeName];
        if (errorType) {
            throw new APIError({
                ...errorType,
                message: message || errorType.description
            });
        }
        throw new Error(errorTypeName);
    }
}