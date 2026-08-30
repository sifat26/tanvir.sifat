import express from 'express';
import auth from '../../middlewares/auth';
import { PersonalController } from './personal.controller';
const router = express.Router();
router.get('/', PersonalController.getPersonal);
router.put('/', auth(), PersonalController.upsertPersonal);
export const PersonalRoutes = router;
