import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

export const uploadToCloudinary = (buffer: Buffer, folder: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: `portfolio/${folder}`, resource_type: 'image' },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    stream.end(buffer);
  });

export default cloudinary;
