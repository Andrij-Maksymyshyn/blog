import { Types } from "mongoose";

export interface IPost {
  readonly _id?: Types.ObjectId;
  title: string;
  text: string;
  readonly date?: Date;
  tags?: string[];
  viewsCount?: number;
  user?: Types.ObjectId;
  imageUrl?: string;
  isDeleted?: boolean;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}
