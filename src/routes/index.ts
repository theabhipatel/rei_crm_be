import { Router } from "express";
import authRouter from "./auth.routes";
import adminRouter from "./admin.routes";
import superAdminRouter from "./superAdmin.routes";
import { authorize } from "../middlewares/authorize";

const router = Router();

router.use("/auth", authRouter);
router.use("/super-admin/dashboard", authorize(["SUPER_ADMIN"]), superAdminRouter);
router.use("admin/dashboard", authorize(["ADMIN", "AGENT"]), adminRouter);

export default router;
