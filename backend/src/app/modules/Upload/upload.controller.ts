import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { uploadToCloudinary } from '../../../helpers/cloudinary.helper';
import ApiError from '../../../errors/ApiError';

const uploadImage = catchAsync(async (req: Request, res: Response) => {
  if (!req.file) throw new ApiError(httpStatus.BAD_REQUEST, 'No file uploaded');
  const folder = (req.query.folder as string) || 'general';
  const url = await uploadToCloudinary(req.file.buffer, folder);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Image uploaded', data: { url } });
});

export const UploadController = { uploadImage };
