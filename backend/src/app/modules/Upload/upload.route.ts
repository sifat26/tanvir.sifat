import express from 'express';
import multer from 'multer';
import auth from '../../middlewares/auth';
import { UploadController } from './upload.controller';

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files allowed'));
  },
});

const router = express.Router();
router.post('/', auth(), upload.single('image'), UploadController.uploadImage);
export const UploadRoutes = router;
