import { Router } from "express";
import { addAgent, getAllAgents, getMyProfie, updateAgent } from "../controllers/admin.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema, updateAgentSchema } from "../validationSchema";

const adminRouter = Router();

adminRouter.get("/", getMyProfie);
adminRouter.get("/get-agents", getAllAgents);
adminRouter.post("/add-agent", authorize(["ADMIN"]), validateInput(registerUserSchema), addAgent);
adminRouter.post("/update-agent/:id", authorize(["ADMIN"]), validateInput(updateAgentSchema), updateAgent);

export default adminRouter;
