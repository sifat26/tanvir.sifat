import bcrypt from 'bcryptjs';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import Admin from './admin.model';
import { TLoginAdmin, TLoginAdminResponse } from './admin.interface';

const loginAdmin = async (payload: TLoginAdmin): Promise<TLoginAdminResponse> => {
  const admin = await Admin.findOne({ email: payload.email });
  if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin account not found.');
  if (admin.isBlocked) throw new ApiError(httpStatus.FORBIDDEN, 'Account is blocked.');
  const isMatch = await bcrypt.compare(payload.password, admin.password);
  if (!isMatch) throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password.');
  const jwtPayload = { userId: (admin._id as any).toString(), role: 'ADMIN', mustChangePassword: admin.mustChangePassword };
  const accessToken = jwtHelpers.createToken(jwtPayload, config.jwt.secret as Secret, config.jwt.expires_in);
  return {
    accessToken,
    mustChangePassword: admin.mustChangePassword,
    adminData: { _id: (admin._id as any).toString(), name: admin.name, email: admin.email, isBlocked: admin.isBlocked, mustChangePassword: admin.mustChangePassword },
  };
};

const getMe = async (adminId: string) => {
  const admin = await Admin.findById(adminId).select('-password');
  if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  return admin;
};

const changePassword = async (adminId: string, payload: { currentPassword: string; newPassword: string }) => {
  const admin = await Admin.findById(adminId);
  if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  const matched = await bcrypt.compare(payload.currentPassword, admin.password);
  if (!matched) throw new ApiError(httpStatus.UNAUTHORIZED, 'Current password is incorrect.');
  admin.password = await bcrypt.hash(payload.newPassword, config.bcrypt_salt_rounds);
  admin.mustChangePassword = false;
  await admin.save();
  const jwtPayload = { userId: (admin._id as any).toString(), role: 'ADMIN', mustChangePassword: false };
  const accessToken = jwtHelpers.createToken(jwtPayload, config.jwt.secret as Secret, config.jwt.expires_in);
  return { accessToken };
};

const updateProfile = async (adminId: string, payload: { name: string }) => {
  const admin = await Admin.findByIdAndUpdate(adminId, { name: payload.name.trim() }, { new: true }).select('-password');
  if (!admin) throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found.');
  return admin;
};

export const AdminService = { loginAdmin, getMe, changePassword, updateProfile };
