import Personal from './personal.model';
const getPersonal = async () => await Personal.findOne();
const upsertPersonal = async (payload: any) =>
  await Personal.findOneAndUpdate({}, payload, { upsert: true, new: true, runValidators: true });
export const PersonalService = { getPersonal, upsertPersonal };
