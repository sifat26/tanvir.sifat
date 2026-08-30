import express from 'express';
import auth from '../../middlewares/auth';
import { ChatLogsController } from './chatlogs.controller';

const router = express.Router();

router.post('/chat', ChatLogsController.chat);
router.get('/', auth(), ChatLogsController.getLogs);

export const ChatLogsRoutes = router;
