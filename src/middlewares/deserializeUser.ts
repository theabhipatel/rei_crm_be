import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import userModel from "../models/user.model";

export const deserializeUser: RequestHandler = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (cookie.accessToken) {
      const userInfo = jwt.verify(cookie.accessToken, JWT_SECRET) as { userId: string };
      const user = await userModel.findById(userInfo.userId);
      if (user && !user.isBlocked) {
        res.locals.userId = userInfo.userId;
        res.locals.role = user.role;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
