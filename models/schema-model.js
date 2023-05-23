const Joi = require("joi");
//schema for user creation
const userSchema = Joi.object({
  ID: Joi.number().required(),
  EMAIL: Joi.string().email().lowercase().required(),
  USERNAME: Joi.string().min(3).required(),
  PASSWORD: Joi.string().min(4).required(),
  PHONE: Joi.string().min(10).optional(),
});

//schema for user updation
const updateSchema = Joi.object({
  EMAIL: Joi.string().email().lowercase().optional(),
  USERNAME: Joi.string().min(3).optional(),
  PHONE: Joi.string().min(10).optional(),
});

module.exports = { userSchema, updateSchema };
