import mongoose, { Schema } from 'mongoose';
const socialsSchema = new Schema({
  github: { type: String, default: '' }, linkedin: { type: String, default: '' },
  twitter: { type: String, default: '' }, facebook: { type: String, default: '' },
  instagram: { type: String, default: '' },
}, { timestamps: true });
const Socials = mongoose.model('Socials', socialsSchema);
export default Socials;
