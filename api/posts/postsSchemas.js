const Joi = require("joi");

const {
  URL_REGEXP,
  SORT_BY,
  DATE,
  OBJECT_ID
} = require("../../configs/regexp.enum");

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

const postCommonParamsSchema = {
  postId: Joi.string().alphanum().regex(OBJECT_ID).required()
};

const newPostSchema = {
  body: Joi.object().keys(Object.assign({}, postSchemaCommonKeys))
};

const allPostsSchema = {
  query: Joi.object().keys({
    page: Joi.string().alphanum().trim().default("1"),
    perPage: Joi.number().integer().min(1).max(100).default(3),
    sortBy: Joi.string()
      .trim()
      .regex(SORT_BY)
      .default("asc(_id)")
      .error(
        new Error(
          "Please enter a valid 'sortBy' parameter. Must be asc(parametr to sort) or desc(parametr to sort)"
        )
      ),
    dateGte: Joi.string().trim().regex(DATE),
    dateLte: Joi.string().trim().regex(DATE),
    tag: Joi.string().trim(),
    authorId: Joi.string().trim().regex(OBJECT_ID)
  })
};

const updatePostSchema = {
  params: Joi.object().keys(Object.assign({}, postCommonParamsSchema)),

  body: Joi.object().keys(Object.assign({}, postSchemaCommonKeys))
};

const deletePostSchema = {
  params: Joi.object().keys(Object.assign({}, postCommonParamsSchema))
};

module.exports = {
  newPostSchema,
  allPostsSchema,
  updatePostSchema,
  deletePostSchema
};
