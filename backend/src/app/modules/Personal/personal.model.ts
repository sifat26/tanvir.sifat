import mongoose, { Schema } from 'mongoose';
const personalSchema = new Schema({
  name: String, shortName: String, role: String, headline: String, intro: String,
  location: String, email: String, phone: String, whatsapp: String,
  resumeUrl: String, resumeDocx: String, resumeUpdated: String,
  portrait: String, portraitWebp: String, portraitSquare: String, portraitSquareWebp: String,
  availability: String,
}, { timestamps: true });
const Personal = mongoose.model('Personal', personalSchema);
export default Personal;
