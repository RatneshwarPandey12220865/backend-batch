import express from "express";
import { generateToken } from "../utils/tokenUtils.js";

const router = express.Router();

router.get("/generate-router", (req, res) => {
    const token = generateToken();
    res.send({
        message: "Token generated successfully",
        token,
    })
});

router.get("/", (req, res) => {
    res.send("Welcome to the public route");
});

export default router;