import mongoose, { Schema } from 'mongoose';
const educationSchema = new Schema({
  degree: { type: String, required: true },
  institute: { type: String, required: true },
  period: String,
  status: { type: String, enum: ['Completed', 'In progress', 'Dropped'], default: 'Completed' },
  notes: [String],
  order: { type: Number, default: 0 },
}, { timestamps: true });
const Education = mongoose.model('Education', educationSchema);
export default Education;
