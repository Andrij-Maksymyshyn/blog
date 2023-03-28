const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const mainRouter = require("./routes/mainRouter");
const { NotFound } = require("./errors/ApiError");
const { SERVER_ERROR } = require("./errors/errorCodes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", mainRouter);
app.use("*", notFoundError);
app.use(mainErrorHandler);

const { PORT = 5000, DB_HOST } = process.env;

mongoose
  .set("debug", true)
  .set("strictQuery", true)
  .connect(DB_HOST)
  .then(() => console.log(`Database connection successful.`))
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });

app.listen(PORT, error => {
  if (error) {
    console.log(error.message);
    process.exit(1);
  }
  console.log(`Server is running on port ${PORT}`);
});

function notFoundError(_, _, next) {
  next(new NotFound("Route not found"));
}

function mainErrorHandler(err, _, res, _) {
  res
    .status(err.status || SERVER_ERROR)
    .json({ message: err.message || "Unknown error" });
}
