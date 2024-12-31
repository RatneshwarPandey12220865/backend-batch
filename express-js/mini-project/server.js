import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import publicRoutes from "./routes/public.routes.js";
import privateRoutes from "./routes/private.routes.js";
import logMiddleware from "./middleware/log.middleware.js";

const app = express();
const PORT = 8080;

// Handle ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Ensure logs directory exists
if(!fs.existsSync(path.join(__dirname, "logs"))){
    fs.mkdirSync(path.join(__dirname, "logs"));
}

// Middleware to parse json and log requests
app.use(express.json());
app.use(logMiddleware);


// middleware to routes
app.use("/public" , publicRoutes)
app.use("/private" , privateRoutes)



// start the server

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});