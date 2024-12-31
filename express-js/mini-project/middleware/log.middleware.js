import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Handle ES Modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Logging Middleware
const logMiddleware = (req, res, next) => {
  const log = `[${new Date().toISOString()}] ${req.method} ${req.url}\n`;
  const logFile = path.join(__dirname, '../logs/requests.log');

  fs.appendFile(logFile, log, (err) => {
    if (err) console.error('Failed to log request:', err);
  });

  next(); // Pass control to the next middleware
};

export default logMiddleware;
