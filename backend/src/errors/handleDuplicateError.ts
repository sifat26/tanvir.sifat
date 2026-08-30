import { IGenericErrorResponse } from '../interfaces/common';
const handleDuplicateError = (error: any): IGenericErrorResponse => {
  const match = error.message.match(/"(.*?)"/);
  const value = match ? match[1] : '';
  return { statusCode: 409, message: 'Duplicate Entry', errorMessages: [{ path: '', message: `${value} already exists` }] };
};
export default handleDuplicateError;
