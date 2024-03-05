import { Router } from "express";
import {
  loginAdmin,
  loginAgent,
  loginUser,
  registerAdmin,
  registerAgent,
  registerUser,
} from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
// authRouter.post("/admin/register", registerAdmin);
// authRouter.post("/admin/login", loginAdmin);
// authRouter.post("/agent/register", registerAgent);
// authRouter.post("/agent/login", loginAgent);

export default authRouter;
