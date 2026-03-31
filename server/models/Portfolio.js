import mongoose from 'mongoose';

const ImpactSchema = new mongoose.Schema(
  {
    value: { type: String, required: false },
    label: { type: String, required: false },
  },
  { _id: false }
);

const ProjectSchema = new mongoose.Schema(
  {
    num: String,
    badge: String,
    title: { type: String, required: false },
    tagline: String,
    problem: String,
    solution: String,
    impact: [ImpactSchema],
    tech: [String],
    liveUrl: String,
    githubUrl: String,
    accentColor: String,
    status: String,
  },
  { timestamps: false }
);

const SkillSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    expert: { type: Boolean, default: false },
  },
  { timestamps: false, _id: true }
);

const ExperienceSchema = new mongoose.Schema(
  {
    id: { type: Number, required: false },
    period: { type: String, required: false },
    role: { type: String, required: false },
    company: { type: String, required: false },
    companyUrl: { type: String, required: false },
    location: { type: String, required: false },
    type: { type: String, required: false },
    description: { type: String, required: false },
    tags: { type: [String], default: [] },
    current: { type: Boolean, default: false },
    isEducation: { type: Boolean, default: false },
  },
  { timestamps: false }
);

const portfolioSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true, required: true },
    projects: [ProjectSchema],
    skills: [SkillSchema],
    experience: [ExperienceSchema],
    theme: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  { timestamps: true }
);

export default mongoose.model('Portfolio', portfolioSchema);

