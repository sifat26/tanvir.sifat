import express from 'express';
import auth from '../../middlewares/auth';
import { SkillsController } from './skills.controller';
const router = express.Router();
router.get('/', SkillsController.getAll);
router.post('/', auth(), SkillsController.create);
router.patch('/:id', auth(), SkillsController.update);
router.delete('/:id', auth(), SkillsController.remove);
export const SkillsRoutes = router;
