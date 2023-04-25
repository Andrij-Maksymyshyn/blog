const postsRouter = require("express").Router();

const { isAuth } = require("../auth/middlewares");
const { objectIdValidator, validate } = require("../../commonMiddleware");
const {
  newPostSchema,
  allPostsSchema,
  updatePostSchema
} = require("./postsSchemas");

const controllers = require("./controllers");

postsRouter.get("/", validate(allPostsSchema), controllers.listPosts);

postsRouter.post("/", isAuth, validate(newPostSchema), controllers.createPost);

postsRouter.use("/:postId", objectIdValidator("postId"));

postsRouter.put("/:postId", validate(updatePostSchema), controllers.updatePost);

module.exports = postsRouter;
