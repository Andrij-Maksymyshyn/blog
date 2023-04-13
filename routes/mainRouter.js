const mainRouter = require("express").Router();
const usersRouter = require("../api/users/usersRouter");
const authRouter = require("../api/auth/authRouter");

mainRouter.use("/api/users", usersRouter);
mainRouter.use("/api/auth", authRouter);

module.exports = mainRouter;
