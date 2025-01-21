import express from "express";
import { authenticateToken } from "../middleware/auth.middleware.js";

const router = express.Router();

// Protected Route
router.get("/", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Welcome to the private route!", user: req.user });
});

export default router;
