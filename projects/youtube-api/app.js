import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/user.routes.js"
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";


dotenv.config()
 const app = express();

 connectDB()

 app.use(bodyParser.json())

 app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
 }))
app.use("/api/user" , userRoutes )


 export default app;