import express from 'express';
import bodyParser from 'body-parser';
import session from "express-session";



import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';



const app = express();

// Middleware
app.use(bodyParser.json());

app.use(
  session({
    secret: "your_secret_key", // Replace with a strong secret key
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // Set to `true` if using HTTPS
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
    },
  })
);


// Routes
app.use('/auth', authRoutes);
app.use('/tasks', taskRoutes);

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
