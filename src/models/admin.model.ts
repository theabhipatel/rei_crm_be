import { Document, Schema, model } from "mongoose";

interface IBaseAdmin {
  companyName: string;
  email: string;
  password: string;
}

interface IAdminSchema extends IBaseAdmin, Document {}

const adminSchema = new Schema<IAdminSchema>({
  companyName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const adminModel = model("admin", adminSchema);

export default adminModel;
