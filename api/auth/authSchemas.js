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

const headersSchema = {
  headers: Joi.object()
    .keys({
      authorization: Joi.string()
        .min(2)
        .max(256)
        .required()
        .error(new Error("Missing token or invalid token"))
    })
    .options({ allowUnknown: true })
};

module.exports = {
  loginUserSchema,
  headersSchema
};
