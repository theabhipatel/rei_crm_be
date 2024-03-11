import { Router } from "express";
import { getMe } from "../controllers/admin.controller";
import { getMyProfile } from "../controllers/superAdmin.controller";

const superAdminRouter = Router();

superAdminRouter.get("/", getMyProfile);

export default superAdminRouter;
