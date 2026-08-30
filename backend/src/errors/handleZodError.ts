import { ZodError } from 'zod';
import { IGenericErrorMessage, IGenericErrorResponse } from '../interfaces/common';
const handleZodError = (error: ZodError): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = error.issues.map((issue) => ({
    path: issue.path[issue.path.length - 1] || '',
    message: issue.message,
  }));
  return { statusCode: 400, message: 'Validation error', errorMessages: errors };
};
export default handleZodError;
