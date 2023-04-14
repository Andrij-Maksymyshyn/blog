const postsRouter = require("express").Router();

const { isAuth } = require("../auth/middlewares");
const validate = require("../../commonMiddleware/validateSchema");
const { newPostSchema } = require("./postsSchemas");

const controllers = require("./controllers");

postsRouter.post("/", isAuth, validate(newPostSchema), controllers.createPost);

module.exports = postsRouter;
