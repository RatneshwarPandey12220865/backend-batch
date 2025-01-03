export const validateTask = (req, res, next) => {
    const { title, description } = req.body;
    if (!title || typeof title !== 'string') {
      return res.status(400).json({ message: 'Invalid title' });
    }
    if (!description || typeof description !== 'string') {
      return res.status(400).json({ message: 'Invalid description' });
    }
    next();
  };
  