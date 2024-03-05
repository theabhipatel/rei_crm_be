import { Router } from "express";
import { addAgent, getMe } from "../controllers/dashboard.controller";
import { isAdminRoutes } from "../middlewares/isAdminRoutes";
import { isAgentRoutes } from "../middlewares/isAgentRoutes";
import { authorize } from "../middlewares/authorize";

const dashboardRouter = Router();

dashboardRouter.get("/get-me", authorize(["SUPER_ADMIN", "ADMIN", "AGENT"]), getMe);
dashboardRouter.post("/add-agent", authorize(["ADMIN"]), addAgent);

export default dashboardRouter;
