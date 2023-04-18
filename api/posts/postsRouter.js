const postsRouter = require("express").Router();

const { isAuth } = require("../auth/middlewares");
const validate = require("../../commonMiddleware/validateSchema");
const { newPostSchema, allPostsSchema } = require("./postsSchemas");

const controllers = require("./controllers");

postsRouter.get("/", isAuth, validate(allPostsSchema), controllers.listPosts);

postsRouter.post("/", isAuth, validate(newPostSchema), controllers.createPost);

module.exports = postsRouter;
