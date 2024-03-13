import { Document, Schema, model } from "mongoose";

export enum ERoles {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  AGENT = "AGENT",
  BUYER = "BUYER",
}

interface IBaseUser {
  fullname: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  associate_admin: string;
  role: ERoles;
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: ERoles.BUYER },
    associate_admin: { type: String },
    isVerified: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const userModel = model<IUserSchema>("user", userSchema);

export default userModel;
