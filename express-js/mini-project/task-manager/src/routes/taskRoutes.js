import { Router } from 'express';
import { getAllTasks, addTask, updateTask, deleteTask } from '../controllers/taskController.js';


import { validateTask } from '../middleware/validateTask.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/', authMiddleware, getAllTasks);
router.post('/', authMiddleware, validateTask, addTask);
router.put('/:id', authMiddleware, validateTask, updateTask);
router.delete('/:id', authMiddleware, deleteTask);

export default router;
