import { Request, Response, NextFunction } from "express";

import { IUser } from "../../../interfaces/userInterface";
import { User } from "../../../models";
import { Conflict } from "../../../errors/ApiError";

interface RequestWithUser extends Request {
  user?: IUser;
}

const checkUserDuplicates =
  (paramName: string, from: string, dbField = paramName) =>
  async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const searchData = req[from as keyof Request][paramName];

      const user = <IUser>await User.findOne({ [dbField]: searchData });

      if (user) {
        throw new Conflict("User with such email already exists.");
      }

      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };

export { checkUserDuplicates };
