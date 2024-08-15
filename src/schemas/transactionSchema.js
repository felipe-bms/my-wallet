import Joi from "joi";

const transactionSchema = Joi.object({
  value: Joi.number().precision(2).positive().required().messages({
    "number.base": "Value must be a number",
    "number.positive": "Value must be a positive number",
    "any.required": "Value is required",
  }),
  description: Joi.string().max(255).required().messages({
    "string.base": "Description must be a string",
    "string.max": "Description cannot exceed 255 characters",
    "any.required": "Description is required",
  }),
  type: Joi.string().valid("deposit", "withdraw").required().messages({
    "string.base": "Type must be a string",
    "any.only": "Type must be either 'deposit' or 'withdraw'",
    "any.required": "Type is required",
  }),
});

export default transactionSchema;
