import { readTasks, writeTasks } from '../utils/fileHandler.js';

export const getAllTasks = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Unauthorized: Please log in' });
  }

  const tasks = await readTasks();
  res.json(tasks.filter((task) => task.username === req.session.user.username));
};

export const addTask = async (req, res) => {
  const { title, description } = req.body;
  const tasks = await readTasks();

  const newTask = {
    id: Date.now(),
    username: req.session.user.username,
    title,
    description,
    completed: false,
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;
  const tasks = await readTasks();

  const taskIndex = tasks.findIndex(
    (task) => task.id === parseInt(id) && task.username === req.session.user.username
  );

  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }

  tasks[taskIndex] = { ...tasks[taskIndex], title, description, completed };
  await writeTasks(tasks);

  res.json(tasks[taskIndex]);
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;
  const tasks = await readTasks();

  const updatedTasks = tasks.filter(
    (task) => task.id !== parseInt(id) || task.username !== req.session.user.username
  );

  if (updatedTasks.length === tasks.length) {
    return res.status(404).json({ message: 'Task not found' });
  }

  await writeTasks(updatedTasks);
  res.status(204).send();
};
