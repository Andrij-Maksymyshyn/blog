import mongoose from "mongoose";

import { IPost } from "../interfaces/postInterface";

const postSchema = new mongoose.Schema<IPost>(
  {
    title: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true,
      unique: true
    },
    date: { type: Date, default: Date.now },
    tags: {
      type: Array,
      default: []
    },
    viewsCount: {
      type: Number,
      default: 0
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    imageUrl: String,
    isDeleted: { type: Boolean, default: false }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Post = mongoose.model<IPost>("Post", postSchema);

export { Post };
