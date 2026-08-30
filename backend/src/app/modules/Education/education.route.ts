import express from 'express';
import auth from '../../middlewares/auth';
import { EducationController } from './education.controller';
const router = express.Router();
router.get('/', EducationController.getAll);
router.post('/', auth(), EducationController.create);
router.patch('/:id', auth(), EducationController.update);
router.delete('/:id', auth(), EducationController.remove);
export const EducationRoutes = router;
