import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import Project from './projects.model';
const getAll = async (type?: string) => {
  const filter = type ? { type } : {};
  return await Project.find(filter).sort({ order: 1, createdAt: -1 });
};
const create = async (payload: any) => await Project.create(payload);
const update = async (id: string, payload: any) => {
  const result = await Project.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
  return result;
};
const remove = async (id: string) => {
  const result = await Project.findByIdAndDelete(id);
  if (!result) throw new ApiError(httpStatus.NOT_FOUND, 'Project not found');
};
export const ProjectsService = { getAll, create, update, remove };
