import { Document, Schema, model } from "mongoose";

interface IAddress {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: number;
}

interface IContact {
  phone: string;
  cell: string;
  email: string;
}

interface IBaseUserProfile {
  user: Schema.Types.ObjectId;
  adminId: Schema.Types.ObjectId;
  companyId: Schema.Types.ObjectId;
  profilePic: string;
  address: IAddress;
  contact: IContact;
}

interface IUserProfileSchema extends IBaseUserProfile, Document {}

const AddressSchema = new Schema<IAddress>({
  line1: { type: String, required: true },
  line2: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: Number, required: true },
});

const ContactSchema = new Schema<IContact>({
  phone: { type: String, required: true },
  cell: { type: String, required: true },
  email: { type: String, required: true },
});

const userProfileSchema = new Schema<IUserProfileSchema>(
  {
    user: { type: Schema.ObjectId, required: true, ref: "user" },
    adminId: { type: Schema.ObjectId },
    companyId: { type: Schema.ObjectId },
    profilePic: { type: String },
    address: { type: AddressSchema },
    contact: { type: ContactSchema },
  },
  { timestamps: true },
);

const userProfileModel = model<IUserProfileSchema>("user-profile", userProfileSchema);

export default userProfileModel;
