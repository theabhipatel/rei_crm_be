import { Router } from "express";
import { addAgent, getAllAgents, getMe, updateAgent } from "../controllers/dashboard.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema, updateAgentSchema } from "../validationSchema";

const dashboardRouter = Router();

dashboardRouter.get("/get-me", authorize(["SUPER_ADMIN", "ADMIN", "AGENT"]), getMe);
dashboardRouter.get("/get-agents", authorize(["SUPER_ADMIN", "ADMIN", "AGENT"]), getAllAgents);
dashboardRouter.post("/add-agent", authorize(["ADMIN"]), validateInput(registerUserSchema), addAgent);
dashboardRouter.post("/update-agent/:id", authorize(["ADMIN"]), validateInput(updateAgentSchema), updateAgent);

export default dashboardRouter;
