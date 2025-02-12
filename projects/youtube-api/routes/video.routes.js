import express from "express";
import { checkAuth } from "../middleware/auth.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Video from "../models/video.model.js";

const router = express.Router();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Video Upload Route
router.post("/upload", checkAuth, async (req, res) => {
  try {
    if (!req.files || !req.files.video || !req.files.thumbnail) {
      return res.status(400).json({ error: "Video and Thumbnail are required" });
    }

    // Upload Video
    const videoUpload = await cloudinary.uploader.upload(req.files.video.tempFilePath, {
      resource_type: "video",
      folder: "videos",
    });

    // Upload Thumbnail
    const thumbnailUpload = await cloudinary.uploader.upload(req.files.thumbnail.tempFilePath, {
      folder: "thumbnails",
    });

    // Create new video document
    const newVideo = new Video({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title,
      description: req.body.description,
      user_id: req.user._id, // Get user from JWT
      videoUrl: videoUpload.secure_url,
      videoId: videoUpload.public_id,
      thumbnmailUrl: thumbnailUpload.secure_url,
      thumbnmailId: thumbnailUpload.public_id,
      category: req.body.category,
      tags: req.body.tags ? req.body.tags.split(",") : [], // Convert tags to an array
    });

    // Save video to DB
    await newVideo.save();

    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

export default router;
