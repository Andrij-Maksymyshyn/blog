const mainRouter = require("express").Router();
const usersRouter = require("../api/users/usersRouter");
const authRouter = require("../api/auth/authRouter");
const postsRouter = require("../api/posts/postsRouter");

mainRouter.use("/api/users", usersRouter);
mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/posts", postsRouter);

module.exports = mainRouter;
