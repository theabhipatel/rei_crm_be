import { RequestHandler } from "express";
import adminModel from "../models/admin.model";
import agentModel from "../models/agent.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

/** ---> Admin */

export const registerAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { fullName, companyName, email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (admin) return res.status(403).json({ success: false, message: "User already registered." });
    const hashedPassword = await bcrypt.hash(password, 10);
    await adminModel.create({ fullName, companyName, email, password: hashedPassword });

    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const loginAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (!admin) return res.status(401).json({ success: false, message: "Wrong credentials." });
    const isPasswordMatched = await bcrypt.compare(password, admin.password);
    if (!isPasswordMatched) return res.status(401).json({ success: false, message: "Wrong credentials." });
    if (!admin.isVerified) return res.status(403).json({ success: false, message: "Admin not verified." });
    if (admin.isBlocked) return res.status(403).json({ success: false, message: "Admin Blocked." });

    const token = jwt.sign({ userId: admin._id }, JWT_SECRET);

    res.cookie("accessToken", token, { maxAge: 1000 * 60 * 10 });
    res.status(200).json({ success: true, message: "User logged in successfully.", admin });
  } catch (error) {
    next(error);
  }
};

/** ---> Agent */

export const registerAgent: RequestHandler = async (req, res, next) => {
  try {
    const { fullName, companyId, email, password } = req.body;
    const agent = await agentModel.findOne({ email });
    if (agent) return res.status(403).json({ success: false, message: "User already registered." });
    const hashedPassword = await bcrypt.hash(password, 10);
    await agentModel.create({ fullName, email, password: hashedPassword, company: companyId });

    res.status(201).json({ success: true, message: "User registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const loginAgent: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const agent = await agentModel.findOne({ email }).populate("company");
    if (!agent) return res.status(401).json({ success: false, message: "Wrong credentials." });
    const isPasswordMatched = await bcrypt.compare(password, agent.password);
    if (!isPasswordMatched) return res.status(401).json({ success: false, message: "Wrong credentials." });
    // @ts-ignore
    if (agent.company.isBlocked) return res.status(403).json({ success: false, message: "Company Blocked." });
    if (!agent.isVerified) return res.status(403).json({ success: false, message: "Agent not verified." });
    if (agent.isBlocked) return res.status(403).json({ success: false, message: "Agent Blocked." });
    const token = jwt.sign({ userId: agent._id }, JWT_SECRET);

    res.cookie("accessToken", token, { maxAge: 1000 * 60 * 10 });
    res.status(200).json({ success: true, message: "User logged in successfully.", agent });
  } catch (error) {
    next(error);
  }
};
