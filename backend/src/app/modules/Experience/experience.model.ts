import mongoose, { Schema } from 'mongoose';
const experienceSchema = new Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  shortName: String, location: String,
  period: { type: String, required: true },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'], default: 'Full-time' },
  summary: String,
  highlights: [String],
  tech: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Experience = mongoose.model('Experience', experienceSchema);
export default Experience;
