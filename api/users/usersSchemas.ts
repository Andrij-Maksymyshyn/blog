import Joi from "joi";

const {
  EMAIL_REGEXP,
  PASSWORD_REGEXP,
  URL_REGEXP,
  OBJECT_ID
} = require("../../configs/regexEnum");

const userSchemaCommonKeys = {
  fullName: Joi.string()
    .min(4)
    .max(25)
    .trim()
    .error(new Error("FullName is not valid")),

  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .required()
    .lowercase()
    .trim()
    .error(new Error("Email is not valid")),

  avatarUrl: Joi.string().regex(URL_REGEXP),
  isDeleted: Joi.boolean().default(false)
};

const userCommonParamsSchema = {
  userId: Joi.string().alphanum().regex(OBJECT_ID).required()
};

const newUserSchema = {
  body: Joi.object().keys(
    Object.assign(
      {
        password: Joi.string()
          .regex(PASSWORD_REGEXP)
          .required()
          .label("password"),
        password_confirmation: Joi.any()
          .valid(Joi.ref("password"))
          .required()
          .label("password_confirmation")
          .options({ messages: { "any.only": "{{#label}} does not match" } })
      },
      userSchemaCommonKeys
    )
  )
};

const allUsersSchema = {
  query: Joi.object().keys({
    page: Joi.string().alphanum().trim().default("1"),
    perPage: Joi.number().integer().min(1).max(100).default(3)
  })
};

const updateUserSchema = {
  params: Joi.object().keys(Object.assign({}, userCommonParamsSchema)),

  body: Joi.object().keys(Object.assign({}, userSchemaCommonKeys))
};

const deleteUserSchema = {
  params: Joi.object().keys(Object.assign({}, userCommonParamsSchema))
};

export { newUserSchema, allUsersSchema, updateUserSchema, deleteUserSchema };
