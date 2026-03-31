import mongoose from 'mongoose';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';

async function resolveTargetUserId(req) {
  const { userId, username } = req.body || {};
  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) return null;
    return userId;
  }
  if (username) {
    const user = await User.findOne({ username: String(username).trim() });
    return user?._id || null;
  }
  return req.user?._id || null;
}

export async function createProject(req, res, next) {
  try {
    const { project } = req.body || {};
    if (!project || typeof project !== 'object' || Array.isArray(project)) {
      return res.status(400).json({ success: false, message: 'project object is required' });
    }

    const targetUserId = await resolveTargetUserId(req);
    if (!targetUserId) return res.status(400).json({ success: false, message: 'Missing target user' });

    const portfolio = await Portfolio.findOne({ userId: targetUserId });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Portfolio for target user not found' });
    }

    portfolio.projects.push(project);
    await portfolio.save();

    const created = portfolio.projects[portfolio.projects.length - 1];
    return res.status(201).json({ success: true, project: created });
  } catch (err) {
    next(err);
  }
}

export async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project id' });
    }

    const fields =
      req.body?.project && typeof req.body.project === 'object' ? req.body.project : req.body;
    if (!fields || typeof fields !== 'object') {
      return res.status(400).json({ success: false, message: 'project update fields are required' });
    }

    const portfolio = await Portfolio.findOne({ 'projects._id': id });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const projectSubdoc = portfolio.projects.id(id);
    if (!projectSubdoc) return res.status(404).json({ success: false, message: 'Project not found' });

    // Prevent overwriting the embedded _id.
    const { _id, ...rest } = fields;
    projectSubdoc.set(rest);
    await portfolio.save();

    return res.json({ success: true, project: projectSubdoc });
  } catch (err) {
    next(err);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project id' });
    }

    const portfolio = await Portfolio.findOne({ 'projects._id': id });
    if (!portfolio) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    const projectSubdoc = portfolio.projects.id(id);
    if (!projectSubdoc) return res.status(404).json({ success: false, message: 'Project not found' });

    // FIX B1: Mongoose 8.x removed .remove() on subdocuments. Use .deleteOne() instead.
    projectSubdoc.deleteOne();
    await portfolio.save();

    return res.json({ success: true, message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
}