import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    // Stored as a bcrypt hash, but kept as `password` to match the requested model shape.
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user', required: true },
  },
  { timestamps: true }
);

userSchema.index({ username: 1 }, { unique: true });

export default mongoose.model('User', userSchema);

