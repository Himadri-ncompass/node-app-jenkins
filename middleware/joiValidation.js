const Joi = require("joi");
//adding schema
const { userSchema, updateSchema } = require("../models/schema-model");

//schema for user create validation
async function validates(req, res, next) {
  try {
    const validated = await userSchema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (err) {
    if (err.isJoi) {
      console.log("Error during validation");
      res.send({
        message: "Error during validation",
        error: err.message,
      });
    }
  }
}
//schema to validate update
async function validatesUpdate(req, res, next) {
  try {
    const validated = await updateSchema.validateAsync(req.body);
    req.body = validated;
    next();
  } catch (err) {
    if (err.isJoi) {
      console.log("Error during validation");
      res.send({
        message: "Error during validation",
        error: err.message,
      });
    }
  }
}

module.exports = { validates, validatesUpdate };
