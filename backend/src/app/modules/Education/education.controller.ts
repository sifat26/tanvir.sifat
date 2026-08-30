import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { EducationService } from './education.service';
const getAll = catchAsync(async (_req: Request, res: Response) => {
  const result = await EducationService.getAll();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Education retrieved', data: result });
});
const create = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.create(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Education created', data: result });
});
const update = catchAsync(async (req: Request, res: Response) => {
  const result = await EducationService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Education updated', data: result });
});
const remove = catchAsync(async (req: Request, res: Response) => {
  await EducationService.remove(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Education deleted', data: null });
});
export const EducationController = { getAll, create, update, remove };
