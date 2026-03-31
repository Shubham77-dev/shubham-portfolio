import mongoose from 'mongoose';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';

export async function getPortfolioByUsername(req, res, next) {
  try {
    const { username } = req.params;
    if (!username) return res.status(400).json({ success: false, message: 'username is required' });

    const user = await User.findOne({ username: username.trim() });
    if (!user) {
      return res.status(404).json({ success: false, message: 'Portfolio owner not found' });
    }

    const portfolio = await Portfolio.findOne({ userId: user._id }).lean();
    if (!portfolio) {
      // In case the portfolio doc wasn't created for older users.
      const created = await Portfolio.create({
        userId: user._id,
        projects: [],
        skills: [],
        experience: [],
        theme: {},
      });
      return res.json({ success: true, username: user.username, portfolio: created });
    }

    return res.json({ success: true, username: user.username, portfolio });
  } catch (err) {
    next(err);
  }
}

export async function updatePortfolio(req, res, next) {
  try {
    const { username, userId, projects, skills, experience, theme } = req.body || {};

    let targetUserId = req.user?._id;

    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ success: false, message: 'Invalid userId' });
      }
      targetUserId = userId;
    } else if (username) {
      const user = await User.findOne({ username: String(username).trim() });
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found for provided username' });
      }
      targetUserId = user._id;
    }

    if (!targetUserId) {
      return res.status(400).json({ success: false, message: 'Missing target user' });
    }

    const update = {};
    if (projects !== undefined) update.projects = projects;
    if (skills !== undefined) update.skills = skills;
    if (experience !== undefined) update.experience = experience;
    if (theme !== undefined) update.theme = theme;

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'No fields provided for update' });
    }

    const updated = await Portfolio.findOneAndUpdate(
      { userId: targetUserId },
      { $set: update },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return res.json({ success: true, message: 'Portfolio updated', portfolio: updated });
  } catch (err) {
    next(err);
  }
}

