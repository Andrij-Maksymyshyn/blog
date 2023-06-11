import { Request, Response, NextFunction } from "express";

const { addPost } = require("../services");
import Helpers from "../../../helpers/helpers";

const createPost = async (
  req: Request | any,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = await addPost(req.body, req.user);

    res.status(Helpers.CREATED).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

export { createPost };
