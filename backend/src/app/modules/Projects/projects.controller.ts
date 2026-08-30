import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProjectsService } from './projects.service';
const getAll = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectsService.getAll(req.query.type as string);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Projects retrieved', data: result });
});
const create = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectsService.create(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Project created', data: result });
});
const update = catchAsync(async (req: Request, res: Response) => {
  const result = await ProjectsService.update(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Project updated', data: result });
});
const remove = catchAsync(async (req: Request, res: Response) => {
  await ProjectsService.remove(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Project deleted', data: null });
});
export const ProjectsController = { getAll, create, update, remove };
