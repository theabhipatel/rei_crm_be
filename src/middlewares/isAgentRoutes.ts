import { RequestHandler } from "express";
import agentModel from "../models/agent.model";

export const isAgentRoutes: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.id;
    if (!userId) return res.status(401).json({ success: false, message: "Please signin first." });
    const agent = await agentModel.findById(userId);
    if (!agent)
      return res.status(404).json({ success: false, message: "Your are not agent you cannot access this route." });

    next();
  } catch (error) {
    next(error);
  }
};
