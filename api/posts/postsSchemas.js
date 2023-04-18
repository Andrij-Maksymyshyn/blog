const Joi = require("joi");

const { URL_REGEXP } = require("../../configs/regexp.enum");

const {
  ID,
  TITLE,
  TEXT,
  VIEWSCOUNT,
  DATE
} = require("../../configs/sortFields.enum");

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

  imageUrl: Joi.string().regex(URL_REGEXP).default(""),

  isDeleted: Joi.boolean().default(false)
};

const newPostSchema = {
  body: Joi.object().keys(Object.assign({}, postSchemaCommonKeys))
};

const allPostsSchema = {
  query: Joi.object().keys({
    page: Joi.string().alphanum().trim().default("1"),
    perPage: Joi.number().integer().min(1).max(100).default(3),
    sortBy: Joi.string()
      .valid(ID, TITLE, TEXT, VIEWSCOUNT, DATE)
      .default("_id")
      .error(new Error("Please enter a valid 'sortBy' parameter")),
    order: Joi.string()
      .valid("ASC", "DESC")
      .default("ASC")
      .error(new Error("Please enter a valid 'order' parameter"))
  })
};

module.exports = {
  newPostSchema,
  allPostsSchema
};
