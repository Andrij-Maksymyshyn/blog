import { Request, Response, NextFunction } from "express";
import { ObjectId } from "mongodb";

import { BadRequest } from "../errors/ApiError";

const objectIdValidator =
  (paramName: string) => (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!ObjectId.isValid(req.params[paramName])) {
        throw new BadRequest("ID is not valid");
      }

      next();
    } catch (error) {
      next(error);
    }
  };

export { objectIdValidator };
