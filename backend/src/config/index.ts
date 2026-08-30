// src/config/index.ts
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '5000',
  mongodb_uri: process.env.MONGODB_URI as string,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expires_in: process.env.JWT_EXPIRES_IN || '30d',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_API_KEY as string,
    api_secret: process.env.CLOUDINARY_API_SECRET as string,
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER as string,
    pass: process.env.SMTP_PASS as string,
    adminEmail: process.env.ADMIN_EMAIL as string,
  },
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  backendUrl: process.env.BACKEND_URL || 'http://localhost:5000',
};
