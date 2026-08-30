import mongoose, { Schema } from 'mongoose';
const aboutSchema = new Schema({ headline: String, short: [String], paragraphs: [String] }, { timestamps: true });
const About = mongoose.model('About', aboutSchema);
export default About;
