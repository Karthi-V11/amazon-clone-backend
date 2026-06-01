export const addAddressSchema = {
  body: {
    type: "object",
    properties: {
      userId: { type: "string" },
      street: { type: "string" },
      city: { type: "string" },
      pincode: { type: "string", minLength: 6, maxLength: 6 },
      country: { type: "string", default: "India" }
    },
    required: ["userId", "street", "city", "pincode"],
    additionalProperties: false
  },
  response: {
    200: {
      type: "object",
      properties: {
        data: {
          type: "object",
          properties: {
            id: { type: "integer" },
            userId: { type: "string" },
            street: { type: "string" },
            city: { type: "string" },
            pincode: { type: "string" },
            country: { type: "string" }
          }
        }
      },
      required: ["data"]
    }
  }
}

export const getAddressSchema = {
  query: {
    type: "object",
    properties: {
      userId: { type: "string" }
    },
    required: ["userId"],
    additionalProperties: false
  }
}
