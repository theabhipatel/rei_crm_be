import { Router } from "express";
import {
  loginAdmin,
  loginAgent,
  loginUser,
  registerAdmin,
  registerAgent,
  registerUser,
} from "../controllers/auth.controller";
import { validateInput } from "../middlewares/validateInput";
import { loginUserSchema, registerUserSchema } from "../validationSchema";

const authRouter = Router();

authRouter.post("/register", validateInput(registerUserSchema), registerUser);
authRouter.post("/login", validateInput(loginUserSchema), loginUser);
// authRouter.post("/admin/register", registerAdmin);
// authRouter.post("/admin/login", loginAdmin);
// authRouter.post("/agent/register", registerAgent);
// authRouter.post("/agent/login", loginAgent);

export default authRouter;
