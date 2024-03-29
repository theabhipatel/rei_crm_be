import { RequestHandler } from "express";
import userModel, { ERoles } from "../models/user.model";
import bcrypt from "bcryptjs";
import planModel from "../models/plan.model";
import userProfileModel from "@/models/userProfile.model";

export const getMyProfile: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const profile = await userProfileModel.findOne({ user: userId }).populate({ path: "user", select: "-password" });
    if (!profile) return res.status(404).json({ success: false, message: "Profile not found." });
    res.status(200).json({ success: true, message: "Profile fetched successfully.", profile });
  } catch (error) {
    next(error);
  }
};

export const addAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (user) return res.status(403).json({ success: false, message: "User already registered." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: ERoles.ADMIN,
    });
    await userProfileModel.create({ user: newUser._id });

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

export const getAdminsWithAgents: RequestHandler = async (req, res, next) => {
  try {
    const admins = await userModel.find({ role: "ADMIN" }).select("-password");
    const agentsMap = new Map();
    const agentDocs = await userModel.aggregate([
      { $match: { role: "AGENT" } },
      {
        $group: { _id: "$associate_admin", agents: { $push: { _id: "$_id", fullname: "$fullname", email: "$email" } } },
      },
    ]);

    agentDocs.forEach((doc) => {
      agentsMap.set(doc._id, doc.agents);
    });

    const adminsWithAgents = admins.map((admin) => {
      const agents = agentsMap.get(admin._id.toString()) || [];
      return { ...admin.toObject(), agents };
    });

    res.status(200).json({ success: true, message: "Admins fetched successfully.", admins: adminsWithAgents });
  } catch (error) {
    next(error);
  }
};

export const createPlan: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const plan = await planModel.create({
      ...req.body,
      createdby: userId,
    });

    res.status(201).json({ success: true, message: "Plan created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getPlans: RequestHandler = async (req, res, next) => {
  try {
    const plans = await planModel.find();

    res.status(200).json({ success: true, message: "Plan fetched successfully.", plans });
  } catch (error) {
    next(error);
  }
};

export const updatePlan: RequestHandler = async (req, res, next) => {
  try {
    const planId = req.params.id;
    const plan = await planModel.findByIdAndUpdate(planId, {
      ...req.body,
    });
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found." });

    res.status(200).json({ success: true, message: "Plan updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deletePlan: RequestHandler = async (req, res, next) => {
  try {
    const planId = req.params.id;
    const plan = await planModel.findByIdAndDelete(planId);
    if (!plan) return res.status(404).json({ success: false, message: "Plan not found." });

    res.status(200).json({ success: true, message: "Plan deleted successfully." });
  } catch (error) {
    next(error);
  }
};
