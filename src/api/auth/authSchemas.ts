import * as Joi from "joi";

import { EMAIL_REGEXP, PASSWORD_REGEXP } from "../../configs/regexEnum";

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
        .error(new Error("Missing token or invalid token. Please, sign in"))
    })
    .options({ allowUnknown: true })
};

export { loginUserSchema, headersSchema };
