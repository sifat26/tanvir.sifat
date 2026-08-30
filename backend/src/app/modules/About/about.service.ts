import About from './about.model';
const getAbout = async () => await About.findOne();
const upsertAbout = async (payload: any) =>
  await About.findOneAndUpdate({}, payload, { upsert: true, new: true });
export const AboutService = { getAbout, upsertAbout };
