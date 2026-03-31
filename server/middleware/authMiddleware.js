import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: 'Missing Bearer token' });
    }

    const token = header.slice('Bearer '.length);
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(payload.userId).select('-password').lean();
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid token user' });
    }

    req.user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    };

    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
}

