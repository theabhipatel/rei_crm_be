import { Document, Schema, model } from "mongoose";

interface IBaseAdmin {
  fullName: string;
  email: string;
  password: string;
  companyName: string;
  isVerified: boolean;
  isBlocked: boolean;
  role: "ADMIN";
}

interface IAdminSchema extends IBaseAdmin, Document {}

const adminSchema = new Schema<IAdminSchema>({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  companyName: { type: String, required: true },
  isVerified: { type: Boolean, default: true },
  isBlocked: { type: Boolean, default: false },
  role: { type: String, default: "ADMIN" },
});

const adminModel = model("admin", adminSchema);

export default adminModel;
