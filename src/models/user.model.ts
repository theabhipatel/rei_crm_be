import { Document, Schema, model } from "mongoose";

interface IBaseUser {
  fullname: string;
  email: string;
  password: string;
  type: "SELLER" | "BUYER";
}

interface IUserSchema extends IBaseUser, Document {}

const userSchema = new Schema<IUserSchema>({
  fullname: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  type: { type: String, default: "SELLER" },
});

const userModel = model("user", userSchema);

export default userModel;
