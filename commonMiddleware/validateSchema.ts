import { Request, Response, NextFunction } from "express";
import * as Joi from "joi";

import ErrorCodes from "../errors/errorCodes";

interface IDefaultSchema {
  body?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  headers?: Joi.ObjectSchema;
}

const getErrorMessage = (req: Request | any, schema: IDefaultSchema | any) => {
  const keys = Object.keys(schema);
  let errorMessage = "";

  for (const key of keys) {
    const validationResult = schema[key].validate(req[key]);

    if (validationResult.error) {
      errorMessage = validationResult.error.message;
    }

    req[key] = validationResult.value;
  }

  return { message: errorMessage };
};

const validate =
  (schema: IDefaultSchema | any) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { message } = getErrorMessage(req, schema);

    if (message) return next({ status: ErrorCodes.BAD_REQUEST, message });

    next();
  };

export { validate };
