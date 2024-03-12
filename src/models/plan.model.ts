import { Document, Schema, model } from "mongoose";

interface IBasePlan {
  title: string;
  type: "Monthly" | "Yearly";
  users: number;
  price_permonth: number;
  createdby: string;
  description: string;
  details: { title: string; description: string }[];
}

interface IPlanSchema extends IBasePlan, Document {}

const planSchema = new Schema<IPlanSchema>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    users: { type: Number, required: true },
    price_permonth: { type: Number, required: true },
    createdby: { type: String, required: true },
    details: [{ title: String, description: String }],
  },
  { timestamps: true },
);

const planModel = model<IBasePlan>("plan", planSchema);

export default planModel;
