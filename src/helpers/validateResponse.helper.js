import ajv from '@src/lib/ajv'

export const validateResponse = (schema, payload) => {
  if (!schema) return

  const validate = ajv.compile(schema)

  if (!validate(payload)) {
    throw {
      status: 500,
      message: 'Response validation failed',
      errors: validate.errors
    }
  }
}