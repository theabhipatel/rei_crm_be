import { Router } from "express";
import { addAdmin, getAllAdmins, getMyProfile, updateAdmin } from "../controllers/superAdmin.controller";

const superAdminRouter = Router();

superAdminRouter.get("/", getMyProfile);
superAdminRouter.get("/get-admins", getAllAdmins);
superAdminRouter.post("/add-admin", addAdmin);
superAdminRouter.patch("/update-admin/:id", updateAdmin);

export default superAdminRouter;
