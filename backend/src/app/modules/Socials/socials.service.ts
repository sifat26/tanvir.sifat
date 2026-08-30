import Socials from './socials.model';
const getSocials = async () => await Socials.findOne();
const upsertSocials = async (payload: any) =>
  await Socials.findOneAndUpdate({}, payload, { upsert: true, new: true });
export const SocialsService = { getSocials, upsertSocials };
