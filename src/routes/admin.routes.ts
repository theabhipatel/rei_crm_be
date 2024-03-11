import { Router } from "express";
import { addAgent, getAllAgents, getMe, updateAgent } from "../controllers/admin.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema, updateAgentSchema } from "../validationSchema";

const adminRouter = Router();

adminRouter.get("/get-me", getMe);
adminRouter.get("/get-agents", getAllAgents);
adminRouter.post("/add-agent", authorize(["ADMIN"]), validateInput(registerUserSchema), addAgent);
adminRouter.post("/update-agent/:id", authorize(["ADMIN"]), validateInput(updateAgentSchema), updateAgent);

export default adminRouter;
