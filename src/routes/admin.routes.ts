import { Router } from "express";
import {
  addAgent,
  createCampaign,
  deleteCampaign,
  getAllAgents,
  getCampaigns,
  getMyProfie,
  updateAgent,
  updateCampaign,
} from "../controllers/admin.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema, updateAgentSchema } from "../validationSchema";

const adminRouter = Router();

adminRouter.get("/", getMyProfie);
adminRouter.get("/get-agents", getAllAgents);
adminRouter.post("/add-agent", authorize(["ADMIN"]), validateInput(registerUserSchema), addAgent);
adminRouter.post("/create-campaign", createCampaign);
adminRouter.get("/get-campaigns", getCampaigns);
adminRouter.patch("/update-agent/:id", authorize(["ADMIN"]), validateInput(updateAgentSchema), updateAgent);
adminRouter.patch("/update-campaign/:id", updateCampaign);
adminRouter.delete("/delete-campaign/:id", deleteCampaign);

export default adminRouter;
