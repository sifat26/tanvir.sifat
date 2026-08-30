import mongoose, { Schema } from 'mongoose';
import { TAdmin } from './admin.interface';
const adminSchema = new Schema<TAdmin>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    isBlocked: { type: Boolean, default: false },
    mustChangePassword: { type: Boolean, default: true },
  },
  { timestamps: true }
);
const Admin = mongoose.model<TAdmin>('Admin', adminSchema);
export default Admin;
