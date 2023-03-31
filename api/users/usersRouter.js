const usersRouter = require("express").Router();

const { validateUser } = require("./middlewares");
const controllers = require("./controllers");

usersRouter.post("/", validateUser, controllers.createUser);

module.exports = usersRouter;
