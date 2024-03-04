import { Router } from "express";
import { loginAdmin, loginAgent, registerAdmin, registerAgent } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/admin/register", registerAdmin);
authRouter.post("/admin/login", loginAdmin);
authRouter.post("/agent/register", registerAgent);
authRouter.post("/agent/login", loginAgent);

export default authRouter;
