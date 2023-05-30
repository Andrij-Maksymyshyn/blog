import { Types } from "mongoose";

export interface IUser {
  readonly _id?: Types.ObjectId | string;
  fullName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  isDeleted?: boolean;
  readonly dateCreation?: Date | string;
  readonly createdAt?: Date | string;
  readonly updatedAt?: Date | string;
}
