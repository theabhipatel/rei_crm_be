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
  userId: Schema.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
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
    userId: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    adminId: { type: String, required: true },
    companyId: { type: String, required: true },
    profilePic: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    contact: { type: ContactSchema, required: true },
  },
  { timestamps: true },
);

const userProfileModel = model<IUserProfileSchema>("user-profile", userProfileSchema);

export default userProfileModel;
