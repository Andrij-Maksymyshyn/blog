const usersRouter = require("express").Router();

const { validate, objectIdValidator } = require("./middlewares");
const {
  allUsersSchema,
  newUserSchema,
  updateUserSchema,
  deleteUserSchema
} = require("./schemas");
const controllers = require("./controllers");

usersRouter.get("/", validate(allUsersSchema), controllers.listUsers);

usersRouter.post("/", validate(newUserSchema), controllers.createUser);

usersRouter.use("/:userId", objectIdValidator("userId"));

usersRouter.put("/:userId", validate(updateUserSchema), controllers.updateUser);

usersRouter.patch(
  "/:userId/isDeleted",
  validate(deleteUserSchema),
  controllers.removeUser
);

module.exports = usersRouter;
