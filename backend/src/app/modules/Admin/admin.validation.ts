import { z } from 'zod';
const loginAdminZodSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email('Invalid email'),
  password: z.string({ required_error: 'Password is required' }).min(1),
});
const changePasswordZodSchema = z.object({
  currentPassword: z.string().min(1, 'Current password required'),
  newPassword: z.string().min(6, 'Min 6 characters'),
});
export const AdminValidation = { loginAdminZodSchema, changePasswordZodSchema };
