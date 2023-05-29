import { Request, Response, NextFunction } from "express";

import { renovateById } from "../services";

const updatePost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await renovateById(req.params.postId, req.body);

    res.status(200).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

export { updatePost };
