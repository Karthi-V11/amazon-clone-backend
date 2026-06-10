export const addAddressSchema = {
  body: {
    type: 'object',
    properties: {
      fullName: { type: 'string' },
      addressLine1: { type: 'string' },
      addressLine2: { type: 'string' },
      city: { type: 'string' },
      state: { type: 'string' },
      postalCode: { type: 'string', minLength: 6, maxLength: 6 },
      country: { type: 'string', default: 'India' },
      isDefault: { type: 'boolean', default: false }
    },
    required: ['fullName', 'addressLine1', 'city', 'state', 'postalCode', 'country'],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' }
      },
      required: ['message', 'data']
    }
  }
}

