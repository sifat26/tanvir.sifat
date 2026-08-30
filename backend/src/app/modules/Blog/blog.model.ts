import { Schema, model } from 'mongoose';

const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true }, // Markdown content
    summary: { type: String, required: true },
    coverImage: { type: String },
    tags: [{ type: String }],
    published: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true },
);

export const Blog = model('Blog', blogSchema);
