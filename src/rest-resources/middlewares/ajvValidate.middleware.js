import { getValidator } from "@src/lib/getValidator";

/**
 * Express middleware factory that validates request data against a JSON‑Schema.
 *
 * @param {object} schema - { body?, query?, params? }
 * @returns {function} Express middleware
 */
export const ajvValidate = (schema = {}) => {
  // Compile once per schema using the cache helper
  const validator = getValidator(schema);

  return (req, res, next) => {
    try {
      if (validator.body && !validator.body(req.body)) {
        throw validator.body.errors;
      }
      if (validator.query && !validator.query(req.query)) {
        throw validator.query.errors;
      }
      if (validator.params && !validator.params(req.params)) {
        throw validator.params.errors;
      }
      next();
    } catch (err) {
      const formatted = Array.isArray(err)
        ? err.map(e => ({
          field:
            e.instancePath ||
            e.params?.missingProperty ||
            "unknown",
          message: e.message
        }))
        : [{ field: "unknown", message: String(err) }];

      next({
        status: 400,
        message: "Validation Error",
        errors: formatted
      });
    }
  }
}
