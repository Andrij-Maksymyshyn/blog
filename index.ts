import express, { Express, Request, Response, NextFunction } from "express";
import { graphqlHTTP } from "express-graphql";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import logger from "morgan";

import * as graphqlSchema from "./GraphQl/schema";
import * as graphqlResolver from "./GraphQl/resolvers";
import { mainRouter } from "./routes/mainRouter";
import { NotFound } from "./errors/ApiError";
import ErrorCodes from "./errors/errorCodes";
const { PORT = 5000, DB_HOST, NODE_ENV } = process.env;

const app: Express = express();

const formatsLogger = app.get("env") === "dev" ? "dev" : "short";
const schemaTyped: any = graphqlSchema;

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
  require("./cronJobs");
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

// const express = require("express");
// const { graphqlHTTP } = require("express-graphql");
// require("dotenv").config();
// const mongoose = require("mongoose");
// const cors = require("cors");
// const logger = require("morgan");

// const mainRouter = require("./routes/mainRouter");
// const { NotFound } = require("./errors/ApiError");
// const { SERVER_ERROR } = require("./errors/errorCodes");
// const { PORT = 5000, DB_HOST, NODE_ENV } = process.env;
// const graphqlSchema = require("./GraphQl/schema");
// const graphqlResolver = require("./GraphQl/resolvers");

// const app = express();

// const formatsLogger = app.get("env") === "dev" ? "dev" : "short";

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());
// app.use("/", mainRouter);
// app.use(
//   "/graphql",
//   graphqlHTTP({
//     schema: graphqlSchema,
//     rootValue: graphqlResolver,
//     graphiql: true
//   })
// );

// app.use("*", notFoundError);
// app.use(mainErrorHandler);

// if (NODE_ENV === "dev") {
//   mongoose.set("debug", true);
// }

// mongoose
//   .set("strictQuery", true)
//   .connect(DB_HOST)
//   .then(() => console.log(`Database connection successful.`))
//   .catch(error => {
//     console.log(error.message);
//     process.exit(1);
//   });

// app.listen(PORT, error => {
//   if (error) {
//     console.log(error.message);
//     process.exit(1);
//   }
//   console.log(`Server is running on port ${PORT}`);
//   require("./cronJobs");
// });

// function notFoundError(_, _, next) {
//   next(new NotFound("Route not found"));
// }

// function mainErrorHandler(err, _, res, _) {
//   res
//     .status(err.status || SERVER_ERROR)
//     .json({ message: err.message || "Unknown error" });
// }
