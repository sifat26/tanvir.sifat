import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SocialsService } from './socials.service';
const getSocials = catchAsync(async (_req: Request, res: Response) => {
  const result = await SocialsService.getSocials();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Socials retrieved', data: result });
});
const upsertSocials = catchAsync(async (req: Request, res: Response) => {
  const result = await SocialsService.upsertSocials(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Socials updated', data: result });
});
export const SocialsController = { getSocials, upsertSocials };
