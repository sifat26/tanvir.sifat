import mongoose, { Schema } from 'mongoose';

const publicationSchema = new Schema(
  {
    title: { type: String, required: true },
    authors: String,
    role: String,
    conference: String,
    journal: String,
    venue: String,
    publisher: String,
    year: String,
    doi: String,
    doiUrl: String,
    url: String,
    summary: String,
    context: String,
    abstract: String,
    highlights: [String],
    tags: [String],
    order: { type: Number, default: 0 },
  },
  { _id: true, timestamps: true, strict: false }
);

const timelineSchema = new Schema(
  {
    year: String,
    title: String,
    description: String,
    order: { type: Number, default: 0 },
  },
  { _id: true, strict: false }
);

const researchSchema = new Schema(
  {
    interests: [String],
    thesis: { title: String, description: String },
    futureDirection: String,
    publications: [publicationSchema],
    timeline: [timelineSchema],
  },
  { timestamps: true, strict: false }
);

const Research = mongoose.model('Research', researchSchema);
export default Research;

