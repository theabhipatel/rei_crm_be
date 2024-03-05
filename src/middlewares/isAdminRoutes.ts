import { RequestHandler } from "express";
import adminModel from "../models/admin.model";

export const isAdminRoutes: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    if (!userId) return res.status(401).json({ success: false, message: "Please signin first." });
    const admin = await adminModel.findById(userId);
    if (!admin)
      return res.status(404).json({ success: false, message: "Your are not admin you cannot access this route." });

    next();
  } catch (error) {
    next(error);
  }
};
