import { validateToken } from "../utils/tokenUtils.js";


// Authentication Middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (token && validateToken(token)) {
    req.user = { name: 'John Doe', id: 1 }; // Mock user data
    next(); // User is authenticated
  } else {
    res.status(401).send('Unauthorized: Invalid or Missing Token');
  }
};

export default authMiddleware;
