import { Router } from "express";
import { getAdminRoutes } from "../controllers/admin.controller";
import { getAgentRoutes } from "../controllers/agent.controller";
import { isAdminRoutes } from "../middlewares/isAdminRoutes";
import { isAgentRoutes } from "../middlewares/isAgentRoutes";

const dashboardRouter = Router();

dashboardRouter.get("/admin/get-access", isAdminRoutes, getAdminRoutes);
dashboardRouter.get("/agent/get-access", isAgentRoutes, getAgentRoutes);

export default dashboardRouter;
