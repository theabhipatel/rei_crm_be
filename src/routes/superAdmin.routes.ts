import { Router } from "express";
import {
  addAdmin,
  createPlan,
  deletePlan,
  getAdminsWithAgents,
  getAllAdmins,
  getMyProfile,
  getPlans,
  updateAdmin,
  updatePlan,
} from "../controllers/superAdmin.controller";
import { validateInput } from "../middlewares/validateInput";
import { addAdminSchema, createPlanSchema, updateAdminSchema } from "../validationSchema";

const superAdminRouter = Router();

superAdminRouter.get("/", getMyProfile);
superAdminRouter.get("/get-admins", getAllAdmins);
superAdminRouter.get("/get-admins-with-agent", getAdminsWithAgents);
superAdminRouter.get("/get-plans", getPlans);
superAdminRouter.post("/add-admin", validateInput(addAdminSchema), addAdmin);
superAdminRouter.post("/create-plan", validateInput(createPlanSchema), createPlan);
superAdminRouter.patch("/update-admin/:id", validateInput(updateAdminSchema), updateAdmin);
superAdminRouter.patch("/update-plan/:id", validateInput(updateAdminSchema), updatePlan);
superAdminRouter.delete("/delete-plan/:id", deletePlan);

export default superAdminRouter;
