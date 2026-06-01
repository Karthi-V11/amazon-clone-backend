export const createOrderSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      shippingAddressId: { type: 'integer' },
      billingAddressId: { type: 'integer' },
      paymentMethod: { type: 'string' },
      metadata: { type: 'object' },
      items: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            productId: { type: 'integer' },
            quantity: { type: 'integer', minimum: 1 }
          },
          required: ['productId'],
          additionalProperties: false
        }
      }
    },
    required: ['userId', 'shippingAddressId', 'billingAddressId', 'items'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'object' }
      },
      required: ['data']
    }
  }
}

export const getOrderSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    },
    required: ['id'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'object' }
      },
      required: ['data']
    }
  }
}

export const getAllOrdersSchema = {
  query: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1 },
      status: { type: 'string' },
      userId: { type: 'integer' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object' } },
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' }
          }
        }
      },
      required: ['data']
    }
  }
}

export const getOrdersHistorySchema = {
  query: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1 }
    },
    required: ['userId'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object' } },
            total: { type: 'integer' },
            page: { type: 'integer' },
            limit: { type: 'integer' }
          }
        }
      },
      required: ['data']
    }
  }
}

export const cancelOrderSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    },
    required: ['id'],
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'object' }
      },
      required: ['data']
    }
  }
}

export const updateStatusSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: 'integer' }
    },
    required: ['id'],
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      status: { type: 'string' }
    },
    required: ['status'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: 'object' }
      },
      required: ['data']
    }
  }
}
