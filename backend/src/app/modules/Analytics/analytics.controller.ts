import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import Analytics from './analytics.model';

// Track a visit
const trackVisit = catchAsync(async (req: Request, res: Response) => {
  const stats = await Analytics.findOneAndUpdate({}, { $inc: { visits: 1 } }, { new: true, upsert: true });
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Visit tracked', data: stats });
});

// Track a resume download
const trackResumeDownload = catchAsync(async (req: Request, res: Response) => {
  const stats = await Analytics.findOneAndUpdate({}, { $inc: { resumeDownloads: 1 } }, { new: true, upsert: true });
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Resume download tracked', data: stats });
});

// Get stats for Admin Dashboard
const getStats = catchAsync(async (req: Request, res: Response) => {
  let stats = await Analytics.findOne();
  if (!stats) {
    stats = await Analytics.create({ visits: 0, resumeDownloads: 0 });
  }
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Analytics retrieved', data: stats });
});

export const AnalyticsController = { trackVisit, trackResumeDownload, getStats };
