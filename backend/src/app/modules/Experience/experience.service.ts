import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Experience from './experience.model';
const getAll = async () => await Experience.find().sort({ order: 1, createdAt: -1 });
const create = async (payload: any) => await Experience.create(payload);
const update = async (id: string, payload: any) => {
  const result = await Experience.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  return result;
};
const remove = async (id: string) => {
  const result = await Experience.findByIdAndDelete(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Experience not found');
  return result;
};
export const ExperienceService = { getAll, create, update, remove };
