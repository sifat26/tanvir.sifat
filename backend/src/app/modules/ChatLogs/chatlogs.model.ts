import { Schema, model } from 'mongoose';

const messageSchema = new Schema(
  {
    role: { type: String, enum: ['user', 'assistant', 'system'], required: true },
    content: { type: String, required: true },
  },
  { _id: false }
);

const chatLogSchema = new Schema(
  {
    sessionId: { type: String, required: true },
    messages: [messageSchema],
    model: { type: String, required: true },
  },
  { timestamps: true }
);

export const ChatLog = model('ChatLog', chatLogSchema);

