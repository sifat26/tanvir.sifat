import mongoose from 'mongoose';
import app from '../backend/src/app';
import config from '../backend/src/config';

let isConnected = false;

async function connectToDatabase() {
  if (isConnected && mongoose.connection.readyState === 1) {
    return;
  }
  const uri = process.env.MONGODB_URI || config.mongodb_uri;
  if (!uri) {
    throw new Error('MONGODB_URI environment variable is missing.');
  }

  await mongoose.connect(uri, {
    bufferCommands: false,
  });
  isConnected = true;
}

export default async function handler(req: any, res: any) {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error: any) {
    console.error('Serverless API Error:', error);
    return res.status(500).json({
      success: false,
      message: 'Database Connection Error on Serverless API',
      error: error?.message || String(error),
    });
  }
}
