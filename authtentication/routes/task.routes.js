import express from 'express';
import { addTask, fetchTasks } from '../controllers/task.controller.js';
import { validateSession } from '../middleware/session.middleware.js';

const router = express.Router();

router.post('/', validateSession, addTask);
router.get('/', validateSession, fetchTasks);

export default router;
