const postsRouter = require("express").Router();

const { isAuth } = require("../auth/middlewares");
const { objectIdValidator, validate } = require("../../commonMiddleware");
const {
  newPostSchema,
  allPostsSchema,
  updatePostSchema,
  deletePostSchema
} = require("./postsSchemas");

const controllers = require("./controllers");

postsRouter.get("/", validate(allPostsSchema), controllers.listPosts);

postsRouter.post("/", isAuth, validate(newPostSchema), controllers.createPost);

postsRouter.use("/:postId", objectIdValidator("postId"));

postsRouter.put(
  "/:postId",
  isAuth,
  validate(updatePostSchema),
  controllers.updatePost
);

postsRouter.delete(
  "/:postId",
  isAuth,
  validate(deletePostSchema),
  controllers.deletePost
);

module.exports = postsRouter;
