import { Document, Schema, model } from "mongoose";

interface IBaseAgent {
  fullName: string;
  email: string;
  password: string;
  company: string;
}

interface IAgentSchema extends IBaseAgent, Document {}

const agentSchema = new Schema<IAgentSchema>({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  company: { type: String, required: true, ref: "admin" },
});

const agentModel = model<IAgentSchema>("agent", agentSchema);

export default agentModel;
