import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleCastError from '../../errors/handleCastError';
import handleDuplicateError from '../../errors/handleDuplicateError';
import handleValidationError from '../../errors/handleValidationError';
import handleZodError from '../../errors/handleZodError';
import { IGenericErrorMessage } from '../../interfaces/common';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  console.error('Error:', err);
  let statusCode = 500;
  let message = 'Something went wrong!';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err instanceof mongoose.Error.ValidationError) {
    const s = handleValidationError(err); statusCode = s.statusCode; message = s.message; errorMessages = s.errorMessages;
  } else if (err instanceof ZodError) {
    const s = handleZodError(err); statusCode = s.statusCode; message = s.message; errorMessages = s.errorMessages;
  } else if (err instanceof mongoose.Error.CastError) {
    const s = handleCastError(err); statusCode = s.statusCode; message = s.message; errorMessages = s.errorMessages;
  } else if (err?.code === 11000) {
    const s = handleDuplicateError(err); statusCode = s.statusCode; message = s.message; errorMessages = s.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode; message = err.message; errorMessages = [{ path: '', message: err.message }];
  } else if (err instanceof Error) {
    message = err.message; errorMessages = [{ path: '', message: err.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.node_env !== 'production' ? err?.stack : undefined,
  });
};

export default globalErrorHandler;
