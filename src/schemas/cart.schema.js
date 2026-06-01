export const getCartSchema = {
  query: {
    type: 'object',
    properties: {
      cartId: { type: 'integer' },
      userId: { type: 'integer' }
    },
    anyOf: [
      { required: ['cartId'] },
      { required: ['userId'] }
    ],
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

export const getAllCartSchema = {
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

const cartIdentifierSchema = {
  type: 'object',
  properties: {
    cartItemId: { type: 'integer' },
    cartId: { type: 'integer' },
    productId: { type: 'integer' }
  },
  anyOf: [
    { required: ['cartItemId'] },
    { required: ['cartId', 'productId'] }
  ],
  additionalProperties: false
}

export const addToCartSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      productId: { type: 'integer' },
      quantity: { type: 'integer', minimum: 1 }
    },
    required: ['userId', 'productId'],
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

export const updateCartSchema = {
  body: {
    type: 'object',
    properties: {
      cartItemId: { type: 'integer' },
      cartId: { type: 'integer' },
      productId: { type: 'integer' },
      quantity: { type: 'integer', minimum: 1 }
    },
    anyOf: [
      { required: ['cartItemId'] },
      { required: ['cartId', 'productId'] }
    ],
    required: ['quantity'],
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

export const removeFromCartSchema = {
  query: cartIdentifierSchema,
  body: cartIdentifierSchema,
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: ['null', 'object'] }
      },
      required: ['data']
    }
  }
}

export const clearAllItemsSchema = {
  query: {
    type: 'object',
    properties: {
      cartId: { type: 'integer' },
      userId: { type: 'integer' }
    },
    anyOf: [
      { required: ['cartId'] },
      { required: ['userId'] }
    ],
    additionalProperties: false
  },
  body: {
    type: 'object',
    properties: {
      cartId: { type: 'integer' },
      userId: { type: 'integer' }
    },
    anyOf: [
      { required: ['cartId'] },
      { required: ['userId'] }
    ],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        data: { type: ['null', 'object'] }
      },
      required: ['data']
    }
  }
}

export const cartMergeSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
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
    required: ['userId', 'items'],
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
