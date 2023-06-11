import { Request, Response, NextFunction } from "express";

import { updateById } from "../services";

const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { userId } = req.params;
    const result = await updateById(userId, req.body);

    res.status(200).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

export { updateUser };
