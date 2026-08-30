import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ChatLog } from './chatlogs.model';

const chat = catchAsync(async (req: Request, res: Response) => {
  const { messages, sessionId, model } = req.body;

  // Try to use backend OPENROUTER_API_KEY if available, else frontend might have passed it.
  const apiKey = process.env.OPENROUTER_API_KEY || (req.headers['x-openrouter-key'] as string);

  if (!apiKey) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: 'OpenRouter API Key not configured in backend',
    });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': req.headers.referer || 'http://localhost:5173',
        'X-Title': 'Sifat Portfolio Chatbot',
      },
      body: JSON.stringify({
        model: model || 'meta-llama/llama-3.1-8b-instruct:free',
        temperature: 0.3,
        max_tokens: 350,
        messages,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return sendResponse(res, { statusCode: response.status, success: false, message: errorText });
    }

    const data = await response.json();
    const reply = data?.choices?.[0]?.message?.content || 'Sorry, I could not generate a response right now.';

    // Save the conversation to DB
    await ChatLog.findOneAndUpdate(
      { sessionId },
      {
        $set: { model },
        $push: {
          messages: {
            $each: [
              messages[messages.length - 1], // user message
              { role: 'assistant', content: reply }, // assistant reply
            ],
          },
        },
      },
      { upsert: true },
    );

    sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Chat success', data: { reply } });
  } catch (error: any) {
    sendResponse(res, { statusCode: 500, success: false, message: error.message });
  }
});

const getLogs = catchAsync(async (req: Request, res: Response) => {
  const logs = await ChatLog.find().sort({ updatedAt: -1 }).limit(50);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Logs retrieved', data: logs });
});

export const ChatLogsController = { chat, getLogs };
