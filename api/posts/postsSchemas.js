const Joi = require("joi");

const postSchemaCommonKeys = {
  title: Joi.string()
    .min(3)
    .max(25)
    .required()
    .trim()
    .error(new Error("title is not valid")),

  text: Joi.string().min(3).required().error(new Error("text is not valid")),

  tags: Joi.array().items(Joi.string()).default([]),

  viewsCount: Joi.number().integer().min(0).default(0),

  imageUrl: Joi.string().default("")
};

const newPostSchema = {
  body: Joi.object().keys(Object.assign({}, postSchemaCommonKeys))
};

module.exports = {
  newPostSchema
};
