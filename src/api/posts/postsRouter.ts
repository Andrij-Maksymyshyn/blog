import * as express from "express";

const postsRouter = express.Router();

import { isAuth } from "../auth/middlewares";
import { objectIdValidator, validate } from "../../commonMiddleware";
import {
  newPostSchema,
  allPostsSchema,
  updatePostSchema,
  deletePostSchema
} from "./postsSchemas";

import * as controllers from "./controllers";

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

export { postsRouter };
