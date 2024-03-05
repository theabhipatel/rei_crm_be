import { Document, Schema, model } from "mongoose";

interface IBaseOwner {
  fullName: string;
  email: string;
  password: string;
  role: "SUPER_ADMIN";
}

interface IOwnerSchema extends IBaseOwner, Document {}

const ownerSchema = new Schema<IOwnerSchema>({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "SUPER_ADMIN", required: false },
});

const ownerModel = model<IOwnerSchema>("owner", ownerSchema);

export default ownerModel;
