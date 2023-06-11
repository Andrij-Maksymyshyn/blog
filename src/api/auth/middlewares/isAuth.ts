import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";

import { IOauth } from "../../../interfaces/schemaInterface";
import { Unauthorized } from "../../../errors/ApiError";
import { verifyToken } from "../../../services";
import { Oauth } from "../../../models";

interface RequestWithUser extends Request {
  user?: Types.ObjectId | string;
}

const isAuth = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.get("Authorization");

    if (!accessToken) {
      throw new Unauthorized("No token. Please, sign in");
    }

    verifyToken(accessToken, "accessToken");

    const tokenWithUser = <IOauth>await Oauth.findOne({ accessToken });

    if (!tokenWithUser) {
      throw new Unauthorized("Invalid token");
    }

    req.user = tokenWithUser?.user;

    next();
  } catch (error) {
    next(error);
  }
};

export { isAuth };
