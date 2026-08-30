import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { sendContactNotification } from '../../../helpers/email.helper';
import Contact from './contact.model';
const submit = async (payload: any) => {
  const doc = await Contact.create(payload);
  try {
    await sendContactNotification(payload);
  } catch (err) {
    console.error('Email send failed (message saved):', err);
  }
  return doc;
};
const getAll = async (filter: any = {}) =>
  await Contact.find(filter).sort({ createdAt: -1 });
const markRead = async (id: string) => {
  const doc = await Contact.findByIdAndUpdate(id, { isRead: true, readAt: new Date() }, { new: true });
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  return doc;
};
const toggleStar = async (id: string) => {
  const doc = await Contact.findById(id);
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
  doc.isStarred = !doc.isStarred;
  await doc.save();
  return doc;
};
const remove = async (id: string) => {
  const doc = await Contact.findByIdAndDelete(id);
  if (!doc) throw new ApiError(httpStatus.NOT_FOUND, 'Message not found');
};
export const ContactService = { submit, getAll, markRead, toggleStar, remove };
