import { Document, Schema, model } from "mongoose";

interface IBaseOwner {
  fullName: string;
  email: string;
  password: string;
}

interface IOwnerSchema extends IBaseOwner, Document {}

const ownerSchema = new Schema<IOwnerSchema>({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const ownerModel = model<IOwnerSchema>("owner", ownerSchema);

export default ownerModel;
