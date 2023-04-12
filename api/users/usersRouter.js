const usersRouter = require("express").Router();

const validate = require("../../commonMiddleware/validateSchema");
const {
  objectIdValidator,
  checkUserDuplicates,
  getUserDynamicly
} = require("./middlewares");
const {
  allUsersSchema,
  newUserSchema,
  updateUserSchema,
  deleteUserSchema
} = require("./usersSchemas");
const controllers = require("./controllers");

usersRouter.get("/", validate(allUsersSchema), controllers.listUsers);

usersRouter.post(
  "/",
  validate(newUserSchema),
  checkUserDuplicates("email", "body"),
  controllers.createUser
);

usersRouter.use(
  "/:userId",
  objectIdValidator("userId"),
  getUserDynamicly("userId", "params", "_id")
);

usersRouter.put("/:userId", validate(updateUserSchema), controllers.updateUser);

usersRouter.delete(
  "/:userId",
  validate(deleteUserSchema),
  controllers.deleteUser
);

module.exports = usersRouter;
