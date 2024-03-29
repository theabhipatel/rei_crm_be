import { RequestHandler } from "express";
import userModel, { ERoles } from "../models/user.model";
import bcrypt from "bcryptjs";
import campaignModel from "../models/campaign.model";
import taskModel from "../models/task.model";
import companyProfileModel from "@/models/companyProfile.model";
import userProfileModel from "@/models/userProfile.model";

export const getMyProfie: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId).select("-password");
    if (!user) return res.status(404).json({ success: false, message: "User not found." });
    res.status(200).json({ success: true, message: "User fetched.", user });
  } catch (error) {
    next(error);
  }
};

//###########################################################
/** ---> Agents related controllers */
//###########################################################

export const addAgent: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const { firstName, lastName, email, password } = req.body;
    const companyProfile = await companyProfileModel.findOne({ $and: [{ admin: { $eq: adminId } }] });
    if (!companyProfile) return res.status(404).json({ success: false, message: "Company profile not found." });
    const agent = await userModel.findOne({ email });
    if (agent) return res.status(403).json({ success: false, message: "Agent already registered." });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newAgent = await userModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      associate_admin: adminId,
      role: ERoles.AGENT,
      companyId: companyProfile._id,
    });
    await userProfileModel.create({
      firstName,
      lastName,
      email,
      userId: newAgent._id,
      role: ERoles.AGENT,
      adminId,
      companyId: companyProfile._id,
    });

    await companyProfileModel.findByIdAndUpdate(companyProfile._id, { $push: { agents: newAgent._id } });

    res.status(201).json({ success: true, message: "Agent registered successfully." });
  } catch (error) {
    next(error);
  }
};

export const getAllAgents: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
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
    const adminId = req.user.userId;
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
    const userId = req.user.userId;
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
    const userId = req.user.userId;
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

export const updateCampaign: RequestHandler = async (req, res, next) => {
  try {
    const campaignId = req.params.id;
    const campaign = await campaignModel.findByIdAndUpdate(campaignId, { ...req.body }, { new: true });
    if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });

    res.status(200).json({ success: true, message: "Campaign updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign: RequestHandler = async (req, res, next) => {
  try {
    const campaignId = req.params.id;
    const campaign = await campaignModel.findByIdAndDelete(campaignId);
    if (!campaign) return res.status(404).json({ success: false, message: "Campaign not found" });

    res.status(200).json({ success: true, message: "Campaign deleted successfully." });
  } catch (error) {
    next(error);
  }
};

//###########################################################
/** ---> Task related controllers */
//###########################################################

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    await taskModel.create({ adminId: userId, ...req.body });

    res.status(201).json({ success: true, message: "Task created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const user = await userModel.findById(userId);
    let tasks;
    if (user?.role === ERoles.AGENT) {
      tasks = await taskModel.find({ $and: [{ adminId: { $eq: user.associate_admin } }] });
    } else if (user?.role === ERoles.ADMIN) {
      tasks = await taskModel.find({ $and: [{ adminId: { $eq: user._id } }] });
    }

    res.status(200).json({ success: true, message: "Tasks fetched successfully.", tasks });
  } catch (error) {
    next(error);
  }
};

export const updateTask: RequestHandler = async (req, res, next) => {
  try {
    const {
      assignToId,
      taskOwner,
      subject,
      status,
      isCompleted,
      isActive,
      startDate,
      dueDate,
      priority,
      reminder,
      repeat,
      discription,
    } = req.body;

    const body = {
      assignToId,
      taskOwner,
      subject,
      status,
      isCompleted,
      isActive,
      startDate,
      dueDate,
      priority,
      reminder,
      repeat,
      discription,
    };
    const taskId = req.params.id;
    const task = await taskModel.findByIdAndUpdate(taskId, { ...body });
    if (!task) return res.status(404).json({ success: true, message: "Task not found." });

    res.status(200).json({ success: true, message: "Task updated successfully." });
  } catch (error) {
    next(error);
  }
};

export const deleteTask: RequestHandler = async (req, res, next) => {
  try {
    const taskId = req.params.id;
    const task = await taskModel.findByIdAndDelete(taskId);
    if (!task) return res.status(404).json({ success: true, message: "Task not found." });

    res.status(200).json({ success: true, message: "Task deleted successfully." });
  } catch (error) {
    next(error);
  }
};

//###########################################################
/** ---> Company profile related controllers */
//###########################################################

export const createCompanyProfile: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const isCompanyProfile = await companyProfileModel.findOne({ $and: [{ admin: { $eq: adminId } }] });
    if (isCompanyProfile) return res.status(403).json({ success: false, message: "Company's profile alread created." });

    await companyProfileModel.create({
      admin: adminId,
      ...req.body,
    });

    res.status(201).json({ success: true, message: "Company's profile created successfully." });
  } catch (error) {
    next(error);
  }
};

export const getCompanyProfile: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.user.userId;
    const profile = await companyProfileModel.findOne({ $and: [{ admin: { $eq: adminId } }] });

    if (!profile) return res.status(404).json({ success: false, message: "Company's profile not found." });

    res.status(200).json({ success: true, message: "Company's profile fetched successfully.", profile });
  } catch (error) {
    next(error);
  }
};

export const updateCompanyProfile: RequestHandler = async (req, res, next) => {
  try {
    const profileId = req.params.id;
    const { companyName, address, logo } = req.body;
    const body = { companyName, address, logo };
    const profile = await companyProfileModel.findByIdAndUpdate(profileId, { ...body });
    if (!profile) return res.status(404).json({ success: false, message: "Company's profile not found." });

    res.status(200).json({ success: true, message: "Company's profile updated successfully." });
  } catch (error) {
    next(error);
  }
};

//###########################################################
/** ---> Profile related controllers */
//###########################################################

// export const updateUserProfile: RequestHandler = async (req, res, next) => {
//   try {
//     const userId = req.user.userId;
//     const { firstName, lastName, email, profilePic, address, contact } = req.body;

//     const profile = await userProfileModel.findOne({ $and: [{ userId: { $eq: userId } }] });
//     if (profile) return res.status(403).json({ success: false, message: "User's profile already created." });

//     await userProfileModel.create({ userId, firstName, lastName, email, profilePic, address, contact });

//     res.status(201).json({ success: true, message: "User's profile created successfully." });
//   } catch (error) {
//     next(error);
//   }
// };
