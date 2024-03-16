import { Router } from "express";
import {
  addAgent,
  createCampaign,
  createTask,
  deleteCampaign,
  deleteTask,
  getAllAgents,
  getCampaigns,
  getMyProfie,
  getTasks,
  updateAgent,
  updateCampaign,
  updateTask,
} from "../controllers/admin.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema, updateAgentSchema } from "../validationSchema";
import { ERoles } from "../models/user.model";

const adminRouter = Router();

adminRouter.get("/", getMyProfie);
adminRouter.get("/get-agents", getAllAgents);
adminRouter.get("/get-campaigns", getCampaigns);
adminRouter.get("/get-tasks", getTasks);
adminRouter.post("/add-agent", authorize([ERoles.ADMIN]), validateInput(registerUserSchema), addAgent);
adminRouter.post("/create-campaign", createCampaign);
adminRouter.post("/create-task", authorize([ERoles.ADMIN]), createTask);
adminRouter.patch("/update-agent/:id", authorize([ERoles.ADMIN]), validateInput(updateAgentSchema), updateAgent);
adminRouter.patch("/update-campaign/:id", updateCampaign);
adminRouter.patch("/update-task/:id", authorize([ERoles.ADMIN]), updateTask);
adminRouter.delete("/delete-campaign/:id", deleteCampaign);
adminRouter.delete("/delete-task/:id", authorize([ERoles.ADMIN]), deleteTask);

export default adminRouter;
