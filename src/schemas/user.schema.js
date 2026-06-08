export const signupSchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      userName: { type: 'string' },
      password: { type: 'string' },
      phone: { type: 'string' },
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      gender: { type: 'string' }
    },
    required: ['email', 'userName', 'password', 'phone'],
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

export const loginSchema = {
  body: {
    type: 'object',
    properties: {
      email: { type: 'string' },
      userName: { type: 'string' },
      password: { type: 'string' }
    },
    required: ['password'],
    anyOf: [
      { required: ['email'] },
      { required: ['userName'] }
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

export const getAllUsersSchema = {
  query: {
    type: 'object',
    properties: {
      page: { type: 'string', minimum: 1 },
      limit: { type: 'string', minimum: 1 },
      search: { type: 'string' },
      isActive: { type: 'boolean' }
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

export const getSpecificUserSchema = {
  query: {
    type: 'object',
    properties: {
      id: { type: 'integer' },
      email: { type: 'string' },
      userName: { type: 'string' }
    },
    anyOf: [
      { required: ['id'] },
      { required: ['email'] },
      { required: ['userName'] }
    ],
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: { type: 'object' }
      },
      required: ['data']
    }
  }
}

export const logoutSchema = {
  body: {
    type: 'object',
    properties: {},
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
