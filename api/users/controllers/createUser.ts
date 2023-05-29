import { Request, Response, NextFunction } from "express";

import { addUser } from "../services";
import Helpers from "../../../helpers/helpers";

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await addUser(req.body);

    res.status(Helpers.CREATED).json({
      data: {
        result
      }
    });
  } catch (error) {
    next(error);
  }
};

export { createUser };
