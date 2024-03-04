import { RequestHandler } from "express";
import adminModel from "../models/admin.model";
import agentModel from "../models/agent.model";

/** ---> Admin */

export const registerAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { companyName, email, password } = req.body;
    const admin = await adminModel.findOne({ email });
    if (admin) return res.status(403).json({ success: false, message: "User already registered." });

    await adminModel.create({ companyName, email, password });

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
    if (admin.password !== password) return res.status(401).json({ success: false, message: "Wrong credentials." });

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

    await agentModel.create({ fullName, email, password, company: companyId });

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
    if (agent.password !== password) return res.status(401).json({ success: false, message: "Wrong credentials." });
    res.cookie("my-cookie", "thisismytoken");
    res.status(200).json({ success: true, message: "User logged in successfully.", agent });
  } catch (error) {
    next(error);
  }
};
