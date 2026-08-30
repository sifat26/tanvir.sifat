import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Education from './education.model';
const getAll = async () => await Education.find().sort({ order: 1, createdAt: -1 });
const create = async (payload: any) => await Education.create(payload);
const update = async (id: string, payload: any) => {
  const result = await Education.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
  return result;
};
const remove = async (id: string) => {
  const result = await Education.findByIdAndDelete(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Education not found');
  return result;
};
export const EducationService = { getAll, create, update, remove };
