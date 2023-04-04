const usersRouter = require("express").Router();

const { validate, objectIdValidator } = require("./middlewares");
const {
  getAllUsersSchema,
  newUserSchema,
  updateUserSchema
} = require("./schemas");
const controllers = require("./controllers");

usersRouter.get("/", validate(getAllUsersSchema), controllers.listUsers);

usersRouter.post("/", validate(newUserSchema), controllers.createUser);

usersRouter.use("/:userId", objectIdValidator("userId"));

usersRouter.put("/:userId", validate(updateUserSchema), controllers.updateUser);

module.exports = usersRouter;
