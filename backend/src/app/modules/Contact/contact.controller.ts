import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ContactService } from './contact.service';
const submit = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.submit(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Message sent successfully!', data: result });
});
const getAll = catchAsync(async (req: Request, res: Response) => {
  const filter: any = {};
  if (req.query.isRead !== undefined) filter.isRead = req.query.isRead === 'true';
  if (req.query.isStarred !== undefined) filter.isStarred = req.query.isStarred === 'true';
  const result = await ContactService.getAll(filter);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Messages retrieved', data: result });
});
const markRead = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.markRead(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Marked as read', data: result });
});
const toggleStar = catchAsync(async (req: Request, res: Response) => {
  const result = await ContactService.toggleStar(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Star toggled', data: result });
});
const remove = catchAsync(async (req: Request, res: Response) => {
  await ContactService.remove(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Message deleted', data: null });
});
export const ContactController = { submit, getAll, markRead, toggleStar, remove };
