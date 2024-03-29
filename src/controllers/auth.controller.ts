import { RequestHandler } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";
import userModel from "../models/user.model";
import userProfileModel from "@/models/userProfile.model";

export const registerUser: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const admin = await userModel.findOne({ email });
    if (admin) return res.status(403).json({ success: false, message: "User already registered." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({ firstName, lastName, email, password: hashedPassword });
    await userProfileModel.create({ user: newUser._id });

    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: "Wrong credentials." });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) return res.status(401).json({ success: false, message: "Wrong credentials." });
    if (!user.isVerified) return res.status(403).json({ success: false, message: "User not verified." });
    if (user.isBlocked) return res.status(403).json({ success: false, message: "User blocked." });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET);

    res.cookie("accessToken", token, { maxAge: 1000 * 60 * 100 });
    res.status(200).json({ success: true, message: "User logged in successfully.", user });
  } catch (error) {
    next(error);
  }
};
