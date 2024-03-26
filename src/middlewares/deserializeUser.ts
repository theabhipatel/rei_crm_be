import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import userModel from "../models/user.model";

export type UserRoles = "SUPER_ADMIN" | "ADMIN" | "AGENT" | "BUYER" | "";

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: UserRoles;
      };
    }
  }
}

export const deserializeUser: RequestHandler = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    req.user = { userId: "", role: "" };
    if (cookie.accessToken) {
      const userInfo = jwt.verify(cookie.accessToken, JWT_SECRET) as { userId: string };
      const user = await userModel.findById(userInfo.userId);
      if (user && !user.isBlocked) {
        req.user.userId = userInfo.userId;
        req.user.role = user.role;
      }
    }
    next();
  } catch (error) {
    next(error);
  }
};
