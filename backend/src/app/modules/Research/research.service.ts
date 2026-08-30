import Research from './research.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const getResearch = async () => {
  let doc = await Research.findOne();
  if (!doc) doc = await Research.create({ interests: [], publications: [], timeline: [] });
  return doc;
};
const updateMain = async (payload: any) =>
  await Research.findOneAndUpdate({}, { $set: payload }, { upsert: true, new: true });

const addPublication = async (payload: any) =>
  await Research.findOneAndUpdate({}, { $push: { publications: payload } }, { upsert: true, new: true });

const updatePublication = async (pubId: string, payload: any) => {
  const doc = await Research.findOneAndUpdate(
    { 'publications._id': pubId },
    { $set: Object.fromEntries(Object.entries(payload).map(([k, v]) => [`publications.$.${k}`, v])) },
    { new: true }
  );
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Publication not found');
  return doc;
};
const removePublication = async (pubId: string) =>
  await Research.findOneAndUpdate({}, { $pull: { publications: { _id: pubId } } }, { new: true });

const addTimeline = async (payload: any) =>
  await Research.findOneAndUpdate({}, { $push: { timeline: payload } }, { upsert: true, new: true });

const updateTimeline = async (itemId: string, payload: any) => {
  const doc = await Research.findOneAndUpdate(
    { 'timeline._id': itemId },
    { $set: Object.fromEntries(Object.entries(payload).map(([k, v]) => [`timeline.$.${k}`, v])) },
    { new: true }
  );
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Timeline item not found');
  return doc;
};
const removeTimeline = async (itemId: string) =>
  await Research.findOneAndUpdate({}, { $pull: { timeline: { _id: itemId } } }, { new: true });

export const ResearchService = {
  getResearch, updateMain, addPublication, updatePublication, removePublication,
  addTimeline, updateTimeline, removeTimeline,
};
