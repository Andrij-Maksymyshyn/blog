import { Request, Response, NextFunction } from "express";

import { getSingleUser } from "../services";
import { IUser } from "../../../interfaces/userInterface";
import { BadRequest } from "../../../errors/ApiError";

const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const deletedUser = <IUser | any>await getSingleUser(userId);

    if (deletedUser) {
      deletedUser.isDeleted = true;
      await deletedUser.save();
    } else {
      throw new BadRequest("User not found");
    }
    res
      .status(200)
      .json({ message: `User with id: ${userId} has successfully deleted.` });
  } catch (error) {
    next(error);
  }
};

export { deleteUser };
