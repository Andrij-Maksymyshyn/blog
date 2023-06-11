import { Request, Response, NextFunction } from "express";

import { IUser } from "../../../interfaces/userInterface";
import { User } from "../../../models";
import { NotFound } from "../../../errors/ApiError";

interface RequestLocalsWithUser extends Request {
  locals?: IUser | any;
}

const getUserDynamicly =
  (paramName: string, from: string, dbField = paramName) =>
  async (
    req: RequestLocalsWithUser,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const searchData = req[from as keyof Request][paramName];

      const user = <IUser>await User.findOne({
        [dbField]: searchData,
        isDeleted: false
      });

      if (!user) {
        throw new NotFound("User not found. Please, create new user.");
      }

      req.locals = { ...req.locals, user };

      next();
    } catch (error) {
      next(error);
    }
  };

export { getUserDynamicly };
