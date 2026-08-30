import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { SkillsService } from './skills.service';
const getAll = catchAsync(async (_req: Request, res: Response) => {
  const result = await SkillsService.getAll();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Skills retrieved', data: result });
});
const create = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsService.create(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Skill group created', data: result });
});
const update = catchAsync(async (req: Request, res: Response) => {
  const result = await SkillsService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Skill group updated', data: result });
});
const remove = catchAsync(async (req: Request, res: Response) => {
  await SkillsService.remove(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Skill group deleted', data: null });
});
export const SkillsController = { getAll, create, update, remove };
