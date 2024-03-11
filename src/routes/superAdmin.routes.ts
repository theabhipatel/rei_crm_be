import { Router } from "express";
import { getMyProfile } from "../controllers/superAdmin.controller";

const superAdminRouter = Router();

superAdminRouter.get("/", getMyProfile);

export default superAdminRouter;
