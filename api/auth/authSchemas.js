const Joi = require("joi");

const { EMAIL_REGEXP, PASSWORD_REGEXP } = require("../../configs/regexp.enum");

const loginUserSchema = {
  body: Joi.object()
    .keys({
      email: Joi.string()
        .regex(EMAIL_REGEXP)
        .lowercase()
        .trim()
        .error(new Error("Email or password is not valid")),
      password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .error(new Error("Email or password is not valid"))
    })
    .required()
};

module.exports = {
  loginUserSchema
};
