import { Document, Schema, model } from "mongoose";

enum EPlanType {
  STANDARD = "STANDARD",
  TEAM = "TEAM",
  CUSTOM = "CUSTOM",
}

interface IBaseCompanyProfile {
  companyName: string;
  admin: string;
  address: string;
  logo: string;
  agents: string[];
  plan: [
    {
      type: EPlanType;
      purchaseDate: string;
      planId: string;
    },
  ];
}

interface ICompanyProfileSchema extends IBaseCompanyProfile, Document {}

const companyProfileSchema = new Schema<ICompanyProfileSchema>(
  {
    companyName: { type: String, required: true },
    admin: { type: String, required: true },
    address: { type: String, required: true },
    logo: { type: String },

    agents: [{ type: String }],
    plan: [
      {
        planId: { type: String, required: true },
        type: { type: String, enum: EPlanType, required: true },
        purchaseDate: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

const companyProfileModel = model<ICompanyProfileSchema>("company-profile", companyProfileSchema);

export default companyProfileModel;
