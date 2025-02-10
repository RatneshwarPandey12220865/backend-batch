import express from "express";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import User from "../models/user.model.js"
import mongoose from "mongoose";
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
        _id:new mongoose.Types.ObjectId,
        channelName:req.body.channelName,
        phone:req.body.phone,
        password:hashcode,
        logoUrl:uploadedImage.secure_url,
        logoId:uploadedImage.public_id
    })

    let user = await newUser.save()

    res.status(201).json({
        newUser:user
    })

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error,
    });
  }
});

export default router;
