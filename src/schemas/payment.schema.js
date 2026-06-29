export const createPaymentSchema = {
    body: {
        type: 'object',
        properties: {
            orderId: {
                type: 'integer'
            }
        },
        required: ['orderId'],
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'object'
                }
            }
        }
    }
}

export const verifyPaymentSchema = {
    body: {
        type: 'object',
        properties: {
            razorpay_order_id: {
                type: 'string'
            },
            razorpay_payment_id: {
                type: 'string'
            },
            razorpay_signature: {
                type: 'string'
            }
        },
        required: [
            'razorpay_order_id',
            'razorpay_payment_id',
            'razorpay_signature'
        ],
        additionalProperties: false
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'string'
                }
            }
        }
    }
}

export const webhookSchema = {
    body: {
        type: 'object',
        properties: {
            event: { type: 'string' },
            payload: {
                type: 'object',
                properties: {
                    payment: {
                        type: 'object',
                        properties: {
                            entity: {
                                type: 'object',
                                properties: {
                                    id: { type: 'string' },
                                    order_id: { type: 'string' },
                                    status: { type: 'string' },
                                    amount: { type: 'integer' },
                                },
                                required: ['id', 'order_id', 'status'],
                            },
                        },
                    },
                },
            },
        },
        required: ['event', 'payload'],
        additionalProperties: true,   // Razorpay adds many fields — don't reject unknown ones
    },
    response: {
        200: {
            type: 'object',
            properties: {
                received: { type: 'boolean' },
            },
            required: ['received'],
        },
    },
}