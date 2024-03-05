import { Router } from "express";
import authRouter from "./auth.routes";
import dashboardRouter from "./dashboard.routes";

const router = Router();

router.use("/auth", authRouter);
router.use(dashboardRouter);

export default router;
