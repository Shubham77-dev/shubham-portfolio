// server/controllers/userController.js  — NEW FILE
//
// Admin-only CRUD for users.
// All routes using this controller are protected by
// authMiddleware + requireAdmin (see userRoutes.js).

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';

// ─── GET /users ───────────────────────────────────────────────────
// List all users, newest first. No passwords returned.
export async function listUsers(req, res, next) {
  try {
    const users = await User.find({})
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, users });
  } catch (err) {
    next(err);
  }
}

// ─── GET /users/:id ───────────────────────────────────────────────
// Fetch a single user by MongoDB _id.
export async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    const user = await User.findById(id).select('-password').lean();
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    next(err);
  }
}

// ─── POST /users ──────────────────────────────────────────────────
// Create a new user. Admin can set role to "admin" or "user".
export async function createUser(req, res, next) {
  try {
    const { username, email, password, role } = req.body || {};

    if (!username || typeof username !== 'string') {
      return res.status(400).json({ success: false, message: 'username is required' });
    }
    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'email is required' });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({ success: false, message: 'password must be at least 6 characters' });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const finalRole = role === 'admin' ? 'admin' : 'user';

    const exists = await User.findOne({
      $or: [{ username: username.trim() }, { email: normalizedEmail }],
    });
    if (exists) {
      return res.status(409).json({ success: false, message: 'Username or email already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashed,
      role: finalRole,
    });

    // Create an empty portfolio for the new user automatically.
    await Portfolio.updateOne(
      { userId: user._id },
      { $setOnInsert: { projects: [], skills: [], experience: [], theme: {} } },
      { upsert: true }
    );

    return res.status(201).json({
      success: true,
      message: 'User created',
      user: { _id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

// ─── PUT /users/:id ───────────────────────────────────────────────
// Update username, email, role, or password.
// Password is only changed when a non-empty value is supplied.
export async function updateUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    const { username, email, role, password } = req.body || {};
    const update = {};

    if (username && typeof username === 'string') update.username = username.trim();
    if (email    && typeof email    === 'string') update.email = String(email).trim().toLowerCase();
    if (role === 'admin' || role === 'user')      update.role  = role;

    if (password && typeof password === 'string') {
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'password must be at least 6 characters' });
      }
      update.password = await bcrypt.hash(password, 12);
    }

    if (Object.keys(update).length === 0) {
      return res.status(400).json({ success: false, message: 'No valid fields to update' });
    }

    const user = await User.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({ success: true, message: 'User updated', user });
  } catch (err) {
    next(err);
  }
}

// ─── DELETE /users/:id ────────────────────────────────────────────
// Delete a user AND their portfolio. Admin cannot delete themselves.
export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid user id' });
    }

    // Safety: prevent an admin from accidentally deleting their own account.
    if (String(req.user._id) === String(id)) {
      return res.status(400).json({ success: false, message: 'You cannot delete your own account' });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Remove their portfolio data too.
    await Portfolio.deleteOne({ userId: id });

    return res.json({ success: true, message: `User "${user.username}" deleted` });
  } catch (err) {
    next(err);
  }
}