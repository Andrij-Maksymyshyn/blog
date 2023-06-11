import { Request, Response, NextFunction } from "express";

import { getSinglePost } from "../services";
import { IPost } from "../../../interfaces/postInterface";
import { BadRequest } from "../../../errors/ApiError";

const deletePost = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { postId } = req.params;
    const deletedPost = <IPost | any>await getSinglePost(postId);

    if (deletedPost) {
      deletedPost.isDeleted = true;
      await deletedPost.save();
    } else {
      throw new BadRequest("Post not found");
    }

    res
      .status(200)
      .json({ message: `Post with id: ${postId} has successfully deleted.` });
  } catch (error) {
    next(error);
  }
};

export { deletePost };
