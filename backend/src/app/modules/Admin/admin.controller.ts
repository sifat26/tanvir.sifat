import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AdminService } from './admin.service';

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.loginAdmin(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Login successful', data: result });
});
const getMe = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getMe(req.user!.userId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Profile retrieved', data: result });
});
const changePassword = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.changePassword(req.user!.userId, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Password changed', data: result });
});
const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateProfile(req.user!.userId, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Profile updated', data: result });
});
export const AdminController = { loginAdmin, getMe, changePassword, updateProfile };
