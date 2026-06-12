export const createOrderSchema = {
  body: {
    type: 'object',
    properties: {
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
    required: ['shippingAddressId', 'billingAddressId', 'items'],
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
  query: {
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
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1 }
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

export const cancelOrderSchema = {
  body: {
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
        message: { type: 'string' }
      },
      required: ['message']
    }
  }
}

export const updateStatusSchema = {
  body: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      status: { type: 'string' }
    },
    required: ['id', 'status'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' }
      }
    }
  }
}
