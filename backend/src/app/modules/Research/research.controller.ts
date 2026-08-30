import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ResearchService } from './research.service';
const getResearch = catchAsync(async (_req: Request, res: Response) => {
  const result = await ResearchService.getResearch();
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Research retrieved', data: result });
});
const updateMain = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.updateMain(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Research updated', data: result });
});
const addPublication = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.addPublication(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Publication added', data: result });
});
const updatePublication = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.updatePublication(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Publication updated', data: result });
});
const removePublication = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.removePublication(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Publication deleted', data: result });
});
const addTimeline = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.addTimeline(req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Timeline item added', data: result });
});
const updateTimeline = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.updateTimeline(req.params.id, req.body);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Timeline updated', data: result });
});
const removeTimeline = catchAsync(async (req: Request, res: Response) => {
  const result = await ResearchService.removeTimeline(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Timeline item deleted', data: result });
});
export const ResearchController = {
  getResearch, updateMain, addPublication, updatePublication, removePublication,
  addTimeline, updateTimeline, removeTimeline,
};
