import mongoose from "mongoose";

import { IUser } from "../interfaces/userInterface";
const SecureFields = ["password"];

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: { type: String, trim: true, default: "" },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: true,
      unique: true
    },
    password: { type: String, minLength: 7, default: "" },
    avatarUrl: String,
    isDeleted: { type: Boolean, default: false },
    dateCreation: { type: Date, default: new Date().toISOString() }
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        for (const field of SecureFields) {
          delete ret[field];
        }
        return ret;
      }
    },
    toObject: {
      virtuals: true,
      transform: function (doc, ret) {
        for (const field of SecureFields) {
          delete ret[field];
        }
        return ret;
      }
    }
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export { User };
