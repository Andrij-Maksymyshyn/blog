const usersRouter = require("express").Router();

const { validateUser } = require("./middlewares");
const controllers = require("./controllers");

usersRouter.get("/", (_, res) => {
  res.send("Hello!");
});

usersRouter.post("/", validateUser, controllers.createUser);

module.exports = usersRouter;
