import { Document, Schema, model } from "mongoose";

interface IBaseCampaign {
  title: string;
  type: "Email" | "SMS";
  status: string;
  isActive: boolean;
  startDate: string;
  endDate: string;
  budgetedCost: number;
  actualCost: number;
  note: string;
  createdby: string;
}

interface ICampaignSchema extends IBaseCampaign, Document {}

const campaignSchema = new Schema<ICampaignSchema>(
  {
    title: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    budgetedCost: { type: Number, required: true },
    actualCost: { type: Number },
    note: { type: String, required: true },
    createdby: { type: String, required: true },
  },
  { timestamps: true },
);

const campaignModel = model<ICampaignSchema>("campaign", campaignSchema);

export default campaignModel;
