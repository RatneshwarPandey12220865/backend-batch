import express from 'express';
import session from 'express-session';
import dotenv from 'dotenv';

import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import { connectDB } from './config/db.config.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Session Configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 600000 }, // 10 minutes
  })
);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

// Database Connection and Server Start
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message);
  });
