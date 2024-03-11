import { Router } from "express";
import { addAdmin, getAllAdmins, getMyProfile, updateAdmin } from "../controllers/superAdmin.controller";
import { validateInput } from "../middlewares/validateInput";
import { addAdminSchema, updateAdminSchema } from "../validationSchema";

const superAdminRouter = Router();

superAdminRouter.get("/", getMyProfile);
superAdminRouter.get("/get-admins", getAllAdmins);
superAdminRouter.post("/add-admin", validateInput(addAdminSchema), addAdmin);
superAdminRouter.patch("/update-admin/:id", validateInput(updateAdminSchema), updateAdmin);

export default superAdminRouter;
