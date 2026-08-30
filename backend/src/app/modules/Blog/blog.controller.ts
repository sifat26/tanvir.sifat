import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { Blog } from './blog.model';

const create = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.create(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Blog created', data: result });
});

const getAll = catchAsync(async (req: Request, res: Response) => {
  // If not admin, only show published
  const query = req.user ? {} : { published: true };
  const result = await Blog.find(query).sort({ createdAt: -1 });
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Blogs retrieved', data: result });
});

const getSingle = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.findOne({ slug: req.params.slug });
  if (!result) {
    return sendResponse(res, { statusCode: httpStatus.NOT_FOUND, success: false, message: 'Blog not found' });
  }
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Blog retrieved', data: result });
});

const update = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Blog updated', data: result });
});

const remove = catchAsync(async (req: Request, res: Response) => {
  const result = await Blog.findByIdAndDelete(req.params.id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Blog deleted', data: result });
});

export const BlogController = { create, getAll, getSingle, update, remove };
