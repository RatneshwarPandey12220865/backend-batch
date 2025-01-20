import { createTask, getTasks } from '../services/task.services.js';

export const addTask = async (req, res) => {
  const { title, description } = req.body;

  try {
    const task = await createTask(req.session.userId, title, description);
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(400).json({ message: 'Error creating task', error: error.message });
  }
};

export const fetchTasks = async (req, res) => {
  try {
    const tasks = await getTasks(req.session.userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching tasks', error: error.message });
  }
};
