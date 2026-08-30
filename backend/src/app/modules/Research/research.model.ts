import mongoose, { Schema } from 'mongoose';
const publicationSchema = new Schema({
  title: { type: String, required: true },
  role: String, conference: String, venue: String, year: String,
  summary: String, context: String, abstract: String,
  tags: [String], order: { type: Number, default: 0 },
}, { _id: true, timestamps: true });
const timelineSchema = new Schema({
  year: String, title: String, description: String,
  order: { type: Number, default: 0 },
}, { _id: true });
const researchSchema = new Schema({
  interests: [String],
  thesis: { title: String, description: String },
  futureDirection: String,
  publications: [publicationSchema],
  timeline: [timelineSchema],
}, { timestamps: true });
const Research = mongoose.model('Research', researchSchema);
export default Research;
