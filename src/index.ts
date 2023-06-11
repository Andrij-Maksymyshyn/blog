import express, { Express, Request, Response, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";

import schema from "./GraphQl/schema";
import * as graphqlResolver from "./GraphQl/resolvers";
import { mainRouter } from "./routes/mainRouter";
import { NotFound } from "./errors/ApiError";
import ErrorCodes from "./errors/errorCodes";
import cronJob from "./cronJobs/index";

const { PORT = 5000, DB_HOST, NODE_ENV } = process.env;

const app: Express = express();

const formatsLogger = app.get("env") === "dev" ? "dev" : "short";
const schemaTyped: any = schema;

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schemaTyped,
    rootValue: graphqlResolver,
    graphiql: true
  })
);

app.use("*", notFoundError);
app.use(mainErrorHandler);

if (NODE_ENV === "dev") {
  mongoose.set("debug", true);
}

mongoose
  .set("strictQuery", true)
  .connect(DB_HOST || "")
  .then(() => console.log(`Database connection successful.`))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  cronJob;
});

function notFoundError(req: Request, res: Response, next: NextFunction) {
  next(new NotFound("Route not found"));
}

function mainErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res
    .status(err.status || ErrorCodes.SERVER_ERROR)
    .json({ message: err.message || "Unknown error" });
}
