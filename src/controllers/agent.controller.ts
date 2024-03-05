import { RequestHandler } from "express";

export const getAgentRoutes: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "I can access Agent's routes." });
  } catch (error) {
    next(error);
  }
};
