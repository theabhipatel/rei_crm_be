import { Router } from "express";
import { addAgent, getMe } from "../controllers/dashboard.controller";
import { authorize } from "../middlewares/authorize";
import { validateInput } from "../middlewares/validateInput";
import { registerUserSchema } from "../validationSchema";

const dashboardRouter = Router();

dashboardRouter.get("/get-me", authorize(["SUPER_ADMIN", "ADMIN", "AGENT"]), getMe);
dashboardRouter.post("/add-agent", authorize(["ADMIN"]), validateInput(registerUserSchema), addAgent);

export default dashboardRouter;
