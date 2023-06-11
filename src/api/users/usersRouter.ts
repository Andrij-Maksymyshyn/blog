import * as express from "express";

const usersRouter = express.Router();

import { objectIdValidator, validate } from "../../commonMiddleware";
import { checkUserDuplicates, getUserDynamicly } from "./middlewares";
import { isAuth } from "../auth/middlewares";
import {
  allUsersSchema,
  newUserSchema,
  updateUserSchema,
  deleteUserSchema
} from "./usersSchemas";
import { headersSchema } from "../auth/authSchemas";
import * as controllers from "./controllers";

usersRouter.get("/", validate(allUsersSchema), controllers.listUsers);

usersRouter.get(
  "/profile",
  validate(headersSchema),
  isAuth,
  controllers.getMyProfile
);

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

export { usersRouter };
