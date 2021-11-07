const joi = require("@hapi/joi");

const registrationValidation = (data) => {
  const schema = joi.object({
    username: joi.string().min(6).max(15).required(),
    first_name: joi.string().min(2).max(100).required(),
    last_name: joi.string().min(2).max(100).required(),
    email: joi.string().email().min(5).max(255).required(),
    password: joi.string().min(8).max(1024).required(),
  });
  return joi.validate(data, schema);
};

const loginValidation = (data) => {
  const schema = joi.object({
    email: joi.string().email().min(5).max(255).required(),
    password: joi.string().min(8).max(1024).required(),
  });
  return joi.validate(data, schema);
};
module.exports.registrationValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
