import express from 'express';
import auth from '../../middlewares/auth';
import { AnalyticsController } from './analytics.controller';

const router = express.Router();

router.post('/visit', AnalyticsController.trackVisit);
router.post('/resume', AnalyticsController.trackResumeDownload);

// Admin route
router.get('/', auth(), AnalyticsController.getStats);

export const AnalyticsRoutes = router;
