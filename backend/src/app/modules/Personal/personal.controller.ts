import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { PersonalService } from './personal.service';
const getPersonal = catchAsync(async (_req: Request, res: Response) => {
  const result = await PersonalService.getPersonal();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Personal data retrieved', data: result });
});
const upsertPersonal = catchAsync(async (req: Request, res: Response) => {
  const result = await PersonalService.upsertPersonal(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Personal data updated', data: result });
});
export const PersonalController = { getPersonal, upsertPersonal };
