import express from 'express';
import auth from '../../middlewares/auth';
import { extractUser } from '../../middlewares/extractUser';
import { BlogController } from './blog.controller';

const router = express.Router();

// extractUser is a soft-auth middleware that just sets req.user if token exists,
// so public can see published, admin can see all
router.get('/', extractUser, BlogController.getAll);
router.get('/:slug', BlogController.getSingle);

router.post('/', auth(), BlogController.create);
router.patch('/:id', auth(), BlogController.update);
router.delete('/:id', auth(), BlogController.remove);

export const BlogRoutes = router;
