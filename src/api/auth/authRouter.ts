import * as express from "express";

const authRouter = express.Router();

import { validate } from "../../commonMiddleware";
import { loginUserSchema } from "./authSchemas";
import { getUserDynamicly } from "../users/middlewares";
import * as controllers from "./controllers";

authRouter.use(getUserDynamicly("email", "body"));
authRouter.post("/login", validate(loginUserSchema), controllers.loginUser);

export { authRouter };
