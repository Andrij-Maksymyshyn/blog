import { Request, Response, NextFunction } from "express";

import { getByParams } from "../../posts/services";

const getMyProfile = async (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getByParams({ user: req.user.toObject()?._id });

    res.status(200).json({
      ...req.user.toObject(),
      posts
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { getMyProfile };
