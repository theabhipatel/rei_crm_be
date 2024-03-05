import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const deserializeUser: RequestHandler = async (req, res, next) => {
  try {
    const cookie = req.cookies;
    if (cookie.accessToken) {
      const userInfo = jwt.verify(cookie.accessToken, JWT_SECRET) as { userId: string };
      res.locals.userId = userInfo.userId;
    }
    next();
  } catch (error) {
    next(error);
  }
};
