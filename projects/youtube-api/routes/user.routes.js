import express from "express";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/signup", async (req, res) => {
  try {
    const hashcode = await bcrypt.hash(req.body.password, 10);
    const uploadedImage = await cloudinary.uploader.upload(
      req.files.logo.tempFilePath
    );
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      channelName: req.body.channelName,
      phone: req.body.phone,
      password: hashcode,
      logoUrl: uploadedImage.secure_url,
      logoId: uploadedImage.public_id,
    });

    let user = await newUser.save();

    res.status(201).json({
      newUser: user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser.length === 0) {
      return res.status(500).json({
        error: "Email is not registered...",
      });
    }

    const isValid = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );

    if (!isValid) {
      return res.status(500).json({
        error: "Invalid password",
      });
    }

    const token =  jwt.sign(
      {
        _id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "10d" }
    );

    res.status(200).json({
      _id: existingUser._id,
        channelName: existingUser.channelName,
        email: existingUser.email,
        phone: existingUser.phone,
        logoId: existingUser.logoId,
        logoUrl:existingUser.logoUrl,
        token:token,
        subscribers:existingUser.subscribers,
        subscribedChannels:existingUser.subscribedChannels

    })
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({ Message: "Something Went Wrong" });
  }
});

router.post("/update-profile", async (req, res) => {});

router.post("/subscribe", async (req, res) => {});

export default router;
