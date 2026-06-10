export const commonArrayResponseSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array'
                }
            },
            required: ['data']
        }
    }
}


export const commonObjectResponseSchema = {
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object'
                }
            },
            required: ['data']
        }
    }
}