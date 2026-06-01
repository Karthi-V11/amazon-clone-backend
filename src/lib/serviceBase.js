export class ServiceBase {
    constructor(context) {
        this.context = context;
        this.models = context.models;
        this.logger = context.logger;
        this.sequelize = context.sequelize;
        this.traceId = context.traceId;
    }
}