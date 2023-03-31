const Joi = require("joi");

const {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  URL_REGEXP
} = require("../../configs/regexp.enum");

const newUserSchema = Joi.object({
  fullName: Joi.string()
    .alphanum()
    .min(4)
    .max(25)
    .trim()
    .error(new Error("fullName is not valid")),

  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .required()
    .lowercase()
    .trim()
    .error(new Error("Email is not valid")),

  password: Joi.string().regex(PASSWORD_REGEXP).required().label("password"),
  password_confirmation: Joi.any()
    .valid(Joi.ref("password"))
    .required()
    .label("password_confirmation")
    .options({ messages: { "any.only": "{{#label}} does not match" } }),

  avatarUrl: Joi.string().regex(URL_REGEXP)
});

module.exports = {
  newUserSchema
};
