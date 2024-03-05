import { Document, Schema, model } from "mongoose";

interface IBaseUser {
  fullname: string;
  email: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  associate_admin: string;
  role: "SUPER_ADMIN" | "ADMIN" | "AGENT" | "BUYER";
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>(
  {
    fullname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "BUYER" },
    associate_admin: { type: String },
    isVerified: { type: Boolean, default: true },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const userModel = model("user", userSchema);

export default userModel;
