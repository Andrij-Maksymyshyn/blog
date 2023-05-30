import { Request, Response, NextFunction } from "express";

import { getAllUsers } from "../services";

const listUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getAllUsers(req.query);

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export { listUsers };
