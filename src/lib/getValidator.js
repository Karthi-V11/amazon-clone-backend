import ajv from "@src/lib/ajv";

// Cache compiled validators per schema object (WeakMap allows GC when schema is no longer referenced)
const schemaCache = new WeakMap();

export const getValidator = (schema) => {
  if (!schemaCache.has(schema)) {
    const compiled = {
      body: schema.body ? ajv.compile(schema.body) : null,
      query: schema.query ? ajv.compile(schema.query) : null,
      params: schema.params ? ajv.compile(schema.params) : null,
    };
    schemaCache.set(schema, compiled);
  }
  return schemaCache.get(schema);
};
