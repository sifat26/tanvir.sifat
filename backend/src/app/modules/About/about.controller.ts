import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AboutService } from './about.service';
const getAbout = catchAsync(async (_req: Request, res: Response) => {
  const result = await AboutService.getAbout();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'About retrieved', data: result });
});
const upsertAbout = catchAsync(async (req: Request, res: Response) => {
  const result = await AboutService.upsertAbout(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'About updated', data: result });
});
export const AboutController = { getAbout, upsertAbout };
