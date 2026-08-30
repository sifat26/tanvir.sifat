import express from 'express';
import auth from '../../middlewares/auth';
import { AboutController } from './about.controller';
const router = express.Router();
router.get('/', AboutController.getAbout);
router.put('/', auth(), AboutController.upsertAbout);
export const AboutRoutes = router;
