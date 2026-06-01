import Ajv from "ajv";
import addErrors from "ajv-errors";

const ajv = new Ajv({
  allErrors: true,
  coerceTypes: true,
  useDefaults: true,
  removeAdditional: true
});

addErrors(ajv);

export default ajv;
