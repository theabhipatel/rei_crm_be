import { RequestHandler } from "express";

export const getAdminRoutes: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "I can access admin routes." });
  } catch (error) {
    next(error);
  }
};
