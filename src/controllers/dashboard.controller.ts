import { RequestHandler } from "express";
import userModel from "../models/user.model";
import bcrypt from "bcryptjs";

export const getMe: RequestHandler = async (req, res, next) => {
  try {
    res.status(200).json({ success: true, message: "I can access admin routes." });
  } catch (error) {
    next(error);
  }
};

export const addAgent: RequestHandler = async (req, res, next) => {
  try {
    const adminId = res.locals.userId;
    const { fullname, email, password } = req.body;
    const admin = await userModel.findOne({ email });
    if (admin) return res.status(403).json({ success: false, message: "Agent already registered." });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ fullname, email, password: hashedPassword, associate_admin: adminId });

    res.status(201).json({ success: true, message: "Agent registered successfully." });
  } catch (error) {
    next(error);
  }
};
