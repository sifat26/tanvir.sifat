import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Skills from './skills.model';
const getAll = async () => await Skills.find().sort({ order: 1, createdAt: 1 });
const create = async (payload: any) => await Skills.create(payload);
const update = async (id: string, payload: any) => {
  const result = await Skills.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Skill group not found');
  return result;
};
const remove = async (id: string) => {
  const result = await Skills.findByIdAndDelete(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Skill group not found');
};
export const SkillsService = { getAll, create, update, remove };
