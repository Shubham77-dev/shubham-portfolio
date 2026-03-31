// server/controllers/authController.js  — PATCHED
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Portfolio from '../models/Portfolio.js';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

// ─── register ────────────────────────────────────────────────────
export async function register(req, res, next) {
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

    const normalizedEmail = normalizeEmail(email);

    // ── Admin role resolution (two safe mechanisms) ───────────────
    //
    // MECHANISM 1 — Invite token (recommended for ongoing use)
    //   Send header:  X-Admin-Invite-Token: <value of ADMIN_INVITE_TOKEN in .env>
    //   Body:         { role: "admin", ... }
    //   The token must be a non-empty string and match exactly.
    //
    // MECHANISM 2 — First-user bootstrap (one-time only)
    //   If NO users exist yet in the DB, the very first registration
    //   automatically becomes admin regardless of the role field.
    //   This lets you bootstrap without needing the invite token.
    //
    // FIX: Original code used `process.env.ADMIN_INVITE_TOKEN &&`
    //      which is falsy when the var is an empty string "".
    //      Now we use `.trim().length > 0` to guard properly.

    const inviteTokenConfigured =
      typeof process.env.ADMIN_INVITE_TOKEN === 'string' &&
      process.env.ADMIN_INVITE_TOKEN.trim().length > 0;

    const inviteTokenMatches =
      inviteTokenConfigured &&
      req.headers['x-admin-invite-token'] === process.env.ADMIN_INVITE_TOKEN;

    const requestedAdmin = role === 'admin';

    // Mechanism 2: first-user bootstrap
    const userCount = await User.countDocuments();
    const isFirstUser = userCount === 0;

    const finalRole =
      (requestedAdmin && inviteTokenMatches) || isFirstUser ? 'admin' : 'user';

    // ── Duplicate check ───────────────────────────────────────────
    const exists = await User.findOne({
      $or: [{ username: username.trim() }, { email: normalizedEmail }],
    });
    if (exists) {
      return res.status(409).json({ success: false, message: 'User with same email/username already exists' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await User.create({
      username: username.trim(),
      email: normalizedEmail,
      password: hashed,
      role: finalRole,
    });

    // Create an empty portfolio document for the new user.
    await Portfolio.updateOne(
      { userId: user._id },
      { $setOnInsert: { projects: [], skills: [], experience: [], theme: {} } },
      { upsert: true }
    );

    return res.status(201).json({
      success: true,
      message: `Registered successfully${finalRole === 'admin' ? ' (admin)' : ''}`,
      user: { _id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}

// ─── login ───────────────────────────────────────────────────────
export async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ success: false, message: 'email is required' });
    }
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'password is required' });
    }

    const normalizedEmail = normalizeEmail(email);

    // `.select('+password')` is required because the password field has
    // `select: false` in the User schema.
    const user = await User.findOne({ email: normalizedEmail }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // JWT_SECRET is guaranteed non-empty by the startup guard in index.js.
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    return res.json({
      success: true,
      message: 'Login successful',
      token,
      user: { _id: user._id, username: user.username, email: user.email, role: user.role },
    });
  } catch (err) {
    next(err);
  }
}