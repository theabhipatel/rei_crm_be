import { Router } from "express";
import {
  addAgent,
  createCampaign,
  createCompanyProfile,
  createTask,
  deleteCampaign,
  deleteTask,
  getAllAgents,
  getCampaigns,
  getCompanyProfile,
  getMyProfie,
  getTasks,
  updateAgent,
  updateCampaign,
  updateCompanyProfile,
  updateTask,
} from "../controllers/admin.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import {
  createCampaignSchema,
  createTaskSchema,
  registerUserSchema,
  updateAgentSchema,
  updateCampaignSchema,
  updateTaskSchema,
} from "../validationSchema";
import { ERoles } from "../models/user.model";

const adminRouter = Router();

adminRouter.get("/", getMyProfie);
adminRouter.get("/get-agents", getAllAgents);
adminRouter.get("/get-campaigns", getCampaigns);
adminRouter.get("/get-tasks", getTasks);
adminRouter.post("/add-agent", authorize([ERoles.ADMIN]), validateInput(registerUserSchema), addAgent);
adminRouter.post("/create-campaign", validateInput(createCampaignSchema), createCampaign);
adminRouter.post("/create-task", authorize([ERoles.ADMIN]), validateInput(createTaskSchema), createTask);
adminRouter.patch("/update-agent/:id", authorize([ERoles.ADMIN]), validateInput(updateAgentSchema), updateAgent);
adminRouter.patch("/update-campaign/:id", validateInput(updateCampaignSchema), updateCampaign);
adminRouter.patch("/update-task/:id", authorize([ERoles.ADMIN]), validateInput(updateTaskSchema), updateTask);
adminRouter.delete("/delete-campaign/:id", deleteCampaign);
adminRouter.delete("/delete-task/:id", authorize([ERoles.ADMIN]), deleteTask);

/** ---> company profile routes. */
adminRouter.post("/create-company-profile", authorize([ERoles.ADMIN]), createCompanyProfile);
adminRouter.get("/get-company-profile", authorize([ERoles.ADMIN]), getCompanyProfile);
adminRouter.patch("/update-company-profile/:id", authorize([ERoles.ADMIN]), updateCompanyProfile);

export default adminRouter;
