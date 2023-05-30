import { Request, Response, NextFunction } from "express";

import { getAllPosts } from "../services";

const listPosts = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getAllPosts(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { listPosts };
