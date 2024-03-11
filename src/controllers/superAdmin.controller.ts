import { RequestHandler } from "express";
import userModel, { ERoles } from "../models/user.model";
import bcrypt from "bcryptjs";

export const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.status(200).json({ success: true, message: "User fetched.", user });
  } catch (error) {
    next(error);
  }
};

export const addAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) return res.status(403).json({ success: false, message: "User already registered." });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ fullname, email, password: hashedPassword, role: ERoles.ADMIN });

    res.status(201).json({ success: true, message: "Admin registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const getAllAdmins: RequestHandler = async (req, res, next) => {
  try {
    const agents = await userModel.find({ $and: [{ role: { $eq: ERoles.ADMIN } }] }).select("-password");
    res.status(200).json({ success: true, message: "Admins fetched.", agents });
  } catch (error) {
    next(error);
  }
};

export const updateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.params.id;
    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const admin = await userModel.findByIdAndUpdate(adminId, { password: hashedPassword, ...req.body });
      if (!admin) return res.status(404).json({ success: false, message: "Admin not found." });
    } else {
      const admin = await userModel.findByIdAndUpdate(adminId, { ...req.body });
      if (!admin) return res.status(404).json({ success: false, message: "Admin not found." });
    }

    res.status(200).json({ success: true, message: "Admin updated successfully." });
  } catch (error) {
    next(error);
  }
};
