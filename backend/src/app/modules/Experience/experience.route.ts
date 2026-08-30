import express from 'express';
import auth from '../../middlewares/auth';
import { ExperienceController } from './experience.controller';
const router = express.Router();
router.get('/', ExperienceController.getAll);
router.post('/', auth(), ExperienceController.create);
router.patch('/:id', auth(), ExperienceController.update);
router.delete('/:id', auth(), ExperienceController.remove);
export const ExperienceRoutes = router;
