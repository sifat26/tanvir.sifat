import express from 'express';
import auth from '../../middlewares/auth';
import { ProjectsController } from './projects.controller';
const router = express.Router();
router.get('/', ProjectsController.getAll);
router.post('/', auth(), ProjectsController.create);
router.patch('/:id', auth(), ProjectsController.update);
router.delete('/:id', auth(), ProjectsController.remove);
export const ProjectsRoutes = router;
