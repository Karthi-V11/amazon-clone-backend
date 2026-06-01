export const createCheckoutSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      shippingAddressId: { type: 'integer' },
      billingAddressId: { type: 'integer' },
      cartId: { type: 'integer' },
      paymentMethod: { type: 'string' },
      couponCode: { type: 'string' }
    },
    required: ['userId', 'shippingAddressId', 'billingAddressId'],
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

export const validateCheckoutSchema = createCheckoutSchema

export const applyCouponSchema = {
  body: {
    type: 'object',
    properties: {
      couponCode: { type: 'string' },
      currentTotal: { type: 'number', minimum: 0 }
    },
    required: ['couponCode', 'currentTotal'],
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

export const selectAddressSchema = {
  body: {
    type: 'object',
    properties: {
      userId: { type: 'integer' },
      addressId: { type: 'integer' }
    },
    required: ['userId', 'addressId'],
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

export const deliverySchema = {
  body: {
    type: 'object',
    properties: {
      method: { type: 'string', enum: ['standard', 'express', 'overnight'] }
    },
    required: ['method'],
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

export const paymentOrderSchema = {
  body: {
    type: 'object',
    properties: {
      orderId: { type: 'integer' },
      paymentMethod: { type: 'string' },
      paymentReference: { type: 'string' }
    },
    required: ['orderId', 'paymentMethod'],
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
