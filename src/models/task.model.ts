import { Document, Schema, model } from "mongoose";

interface IBaseTask {
  adminId: string;
  assignToId: string;
  taskOwner: string;
  subject: string;
  status: string;
  isCompleted: boolean;
  isActive: boolean;
  startDate: string;
  dueDate: string;
  priority: string;
  reminder: string;
  repeat: string;
  discription: string;
}

interface ITaskSchema extends IBaseTask, Document {}

const taskSchema = new Schema<ITaskSchema>(
  {
    assignToId: { type: String, required: true },
    adminId: { type: String, required: true },
    taskOwner: { type: String, required: true },
    subject: { type: String, required: true },
    status: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    startDate: { type: String, required: true },
    dueDate: { type: String, required: true },
    priority: { type: String, required: true },
    repeat: { type: String, required: true },
    discription: { type: String, required: true },
  },
  { timestamps: true },
);

const taskModel = model<ITaskSchema>("task", taskSchema);

export default taskModel;
