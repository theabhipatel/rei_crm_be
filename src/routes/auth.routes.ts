import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { validateInput } from "../middlewares/validateInput";
import { loginUserSchema, registerUserSchema } from "../validationSchema";

const authRouter = Router();

authRouter.post("/register", validateInput(registerUserSchema), registerUser);
authRouter.post("/login", validateInput(loginUserSchema), loginUser);

export default authRouter;
