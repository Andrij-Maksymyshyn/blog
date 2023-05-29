import { Request, Response, NextFunction } from "express";

import { createOauthPair } from "../services";
import { checkPasswords, generateAccessTokenPair } from "../../../services";

const loginUser = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.locals.user;

    checkPasswords(user.password, req.body.password);
    const tokenPair = generateAccessTokenPair({ ...user?._id });

    await createOauthPair({ ...tokenPair, user: user._id });
    res.json({ ...tokenPair, user });
  } catch (error) {
    next(error);
  }
};

export { loginUser };
