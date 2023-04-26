const authRouter = require("express").Router();

const { validate } = require("../../commonMiddleware");
const { loginUserSchema } = require("./authSchemas");
const { getUserDynamicly } = require("../users/middlewares");
const controllers = require("./controllers");

authRouter.use(getUserDynamicly("email", "body"));
authRouter.post("/login", validate(loginUserSchema), controllers.loginUser);

module.exports = authRouter;
