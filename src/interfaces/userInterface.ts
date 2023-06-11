import { Types } from "mongoose";

export interface IUser {
  readonly _id?: Types.ObjectId;
  fullName: string;
  email: string;
  password?: string;
  avatarUrl?: string;
  isDeleted?: boolean;
  readonly dateCreation?: Date;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
