import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware , (req, res) => {
    res.send(`Welcome to the dashboard ${req.user.name}!`);
});

export default router;