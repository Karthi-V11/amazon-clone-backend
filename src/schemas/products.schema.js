export const getAllProductsSchema = {
  query: {
    type: 'object',
    properties: {
      page: { type: 'integer', minimum: 1 },
      limit: { type: 'integer', minimum: 1 },
      categoryId: { type: 'integer' },
      subCategoryId: { type: 'integer' },
      minPrice: { type: 'number' },
      maxPrice: { type: 'number' },
      search: { type: 'string' },
      isActive: { type: 'boolean' },
      sortBy: { type: 'string' },
      sortOrder: { type: 'string', enum: ['ASC', 'DESC', 'asc', 'desc'] }
    },
    additionalProperties: false
  },
  response: {
    200: {
      type: 'object',
      properties: {
        message: { type: 'string' },
        data: {
          type: 'object',
          properties: {
            items: { type: 'array', items: { type: 'object' } },
            total: { type: 'integer' },
            page: { type: 'integer' },
            perPage: { type: 'integer' }
          }
        }
      },
      required: ['message', 'data']
    }
  }
}

export const getSpecificProductSchema = {
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
        message: { type: 'string' },
        data: { type: 'object' }
      },
      required: ['message', 'data']
    }
  }
}
