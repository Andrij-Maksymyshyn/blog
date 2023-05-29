import { Types } from "mongoose";

export interface IOauth {
  readonly _id?: Types.ObjectId | string;
  accessToken: string;
  refreshToken: string;
  user: Types.ObjectId | string;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
