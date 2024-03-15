import { RequestHandler } from "express";
import userModel, { ERoles } from "../models/user.model";
import bcrypt from "bcryptjs";
import campaignModel from "../models/campaign.model";

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
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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

    const agent = await userModel.findById(agentId);
    if (!agent) return res.status(404).json({ success: false, message: "Agent not found." });
    if (agent.associate_admin !== adminId)
      return res.status(403).json({ success: false, message: "Agent cannot be updated." });

    const { password } = req.body;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      await userModel.findByIdAndUpdate(agentId, { password: hashedPassword, ...req.body });
    } else {
      await userModel.findByIdAndUpdate(agentId, { ...req.body });
    }

    res.status(200).json({ success: true, message: "Agent updated successfully." });
  } catch (error) {
    next(error);
  }
};

//###########################################################
/** ---> Campaign related controllers */
//###########################################################

export const createCampaign: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await userModel.findById(userId);
    if (user?.role === ERoles.AGENT) {
      await campaignModel.create({ createdby: userId, adminId: user.associate_admin, ...req.body });
    } else if (user?.role === ERoles.ADMIN) {
      await campaignModel.create({ createdby: userId, adminId: user._id, ...req.body });
    }

    res.status(201).json({ success: true, message: "Campaign created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getCampaigns: RequestHandler = async (req, res, next) => {
  try {
    const userId = res.locals.userId;
    const user = await userModel.findById(userId);
    let campaigns;
    if (user?.role === ERoles.AGENT) {
      campaigns = await campaignModel.find({ $and: [{ adminId: { $eq: user.associate_admin } }] });
    } else if (user?.role === ERoles.ADMIN) {
      campaigns = await campaignModel.find({ $and: [{ adminId: { $eq: user._id } }] });
    }

    res.status(200).json({ success: true, message: "Campaign fetched successfully.", campaigns });
  } catch (error) {
    next(error);
  }
};
