import express from 'express';
import auth from '../../middlewares/auth';
import { SocialsController } from './socials.controller';
const router = express.Router();
router.get('/', SocialsController.getSocials);
router.put('/', auth(), SocialsController.upsertSocials);
export const SocialsRoutes = router;
