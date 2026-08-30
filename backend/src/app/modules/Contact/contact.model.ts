import mongoose, { Schema } from 'mongoose';
const contactSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false },
  isStarred: { type: Boolean, default: false },
  readAt: Date,
}, { timestamps: true });
const Contact = mongoose.model('Contact', contactSchema);
export default Contact;
