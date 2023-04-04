const usersRouter = require("express").Router();

const { validateUser, validate } = require("./middlewares");
const { getAllUsersSchema } = require("./schemasValidator");
const controllers = require("./controllers");

usersRouter.get("/", validate(getAllUsersSchema), controllers.listUsers);

usersRouter.post("/", validateUser, controllers.createUser);

module.exports = usersRouter;
