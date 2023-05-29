import { Types } from "mongoose";

export interface IPost {
  readonly _id?: Types.ObjectId | string;
  title: string;
  text: string;
  readonly date?: Date | string;
  tags?: string[];
  viewsCount?: number;
  user?: Types.ObjectId | string;
  imageUrl?: string;
  isDeleted?: boolean;
  readonly createdAt?: Date | string;
  readonly updatedAt?: Date | string;
}
