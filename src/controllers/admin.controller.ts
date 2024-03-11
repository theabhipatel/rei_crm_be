import { RequestHandler } from "express";
import userModel, { ERoles } from "../models/user.model";
import bcrypt from "bcryptjs";

export const getMyProfie: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.status(200).json({ success: true, message: "User fetched.", user });
  } catch (error) {
    next(error);
  }
};

export const addAgent: RequestHandler = async (req, res, next) => {
  try {
    const adminId = res.locals.userId;
    const { fullname, email, password } = req.body;
    const agent = await userModel.findOne({ email });
    if (agent) return res.status(403).json({ success: false, message: "Agent already registered." });
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ fullname, email, password: hashedPassword, associate_admin: adminId, role: ERoles.AGENT });

    res.status(201).json({ success: true, message: "Agent registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const getAllAgents: RequestHandler = async (req, res, next) => {
  try {
    const adminId = res.locals.userId;
    const agents = await userModel
      .find({ $and: [{ associate_admin: { $eq: adminId }, role: { $eq: ERoles.AGENT } }] })
      .select("-password");
    res.status(200).json({ success: true, message: "Agents fetched.", agents });
  } catch (error) {
    next(error);
  }
};

export const updateAgent: RequestHandler = async (req, res, next) => {
  try {
    const adminId = res.locals.userId;
    const agentId = req.params.id;

    console.log("------------- req.body --->", req.body);

    const agent = await userModel.findById(agentId);
    if (!agent) return res.status(404).json({ success: false, message: "Agent not found." });
    if (agent.associate_admin !== adminId)
      return res.status(403).json({ success: false, message: "Agent cannot be updated." });

    await userModel.findByIdAndUpdate(agentId, { ...req.body });
    res.status(200).json({ success: true, message: "Agent updated successfully." });
  } catch (error) {
    next(error);
  }
};
