import mongoose, { Schema } from 'mongoose';
const linksSchema = new Schema({ live: String, github: String, githubServer: String }, { _id: false });
const projectSchema = new Schema({
  type: { type: String, enum: ['personal', 'client'], required: true },
  title: { type: String, required: true },
  category: String, role: String, team: String, year: String,
  featured: { type: Boolean, default: false },
  tagline: String, overview: String,
  contributions: [String], problem: String, solution: String,
  features: [String], challenges: String,
  tech: [String],
  image: String,
  links: linksSchema,
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Project = mongoose.model('Project', projectSchema);
export default Project;
