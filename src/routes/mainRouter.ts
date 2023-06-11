import * as express from "express";

import { usersRouter } from "../api/users/usersRouter";
import { authRouter } from "../api/auth/authRouter";
import { postsRouter } from "../api/posts/postsRouter";

const mainRouter = express.Router();

mainRouter.use("/api/users", usersRouter);
mainRouter.use("/api/auth", authRouter);
mainRouter.use("/api/posts", postsRouter);

export { mainRouter };
