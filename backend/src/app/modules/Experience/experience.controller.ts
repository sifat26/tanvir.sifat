import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ExperienceService } from './experience.service';
const getAll = catchAsync(async (_req: Request, res: Response) => {
  const result = await ExperienceService.getAll();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Experiences retrieved', data: result });
});
const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.create(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Experience created', data: result });
});
const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Experience updated', data: result });
});
const remove = catchAsync(async (req: Request, res: Response) => {
  await ExperienceService.remove(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Experience deleted', data: null });
});
export const ExperienceController = { getAll, create, update, remove };
