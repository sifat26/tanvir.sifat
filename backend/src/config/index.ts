import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const DEFAULT_MONGO_URI =
  'mongodb://sifatict26_db_user:39q1GUM5YYbmvyN3@ac-kzkc9nu-shard-00-00.fu7k8im.mongodb.net:27017,ac-kzkc9nu-shard-00-01.fu7k8im.mongodb.net:27017,ac-kzkc9nu-shard-00-02.fu7k8im.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-ahcigm-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

export default {
  node_env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '5000',
  mongodb_uri: process.env.MONGODB_URI || DEFAULT_MONGO_URI,
  bcrypt_salt_rounds: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  jwt: {
    secret: process.env.JWT_SECRET || 'super_secret_jwt_key_change_me_in_production_tanvir_sifat_2026',
    expires_in: process.env.JWT_EXPIRES_IN || '90d',
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dklcgg4jx',
    api_key: process.env.CLOUDINARY_API_KEY || '349633643938146',
    api_secret: process.env.CLOUDINARY_API_SECRET || 'ljSon8bsgXXDXFvNw3RW9pPEGxE',
  },
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    user: process.env.SMTP_USER || 'sifatict26@gmail.com',
    pass: process.env.SMTP_PASS || 'gigd ldwa pffn ngob',
    adminEmail: process.env.ADMIN_EMAIL || 'sifatict26@gmail.com',
  },
  frontendUrl: process.env.FRONTEND_URL || 'https://tanvir-sifat.vercel.app',
  backendUrl: process.env.BACKEND_URL || 'https://tanvir-sifat.vercel.app',
};
