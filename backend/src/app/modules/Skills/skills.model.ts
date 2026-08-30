import mongoose, { Schema } from 'mongoose';
const skillsSchema = new Schema({
  group: { type: String, required: true },
  items: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Skills = mongoose.model('Skills', skillsSchema);
export default Skills;
