import express from "express";
import usersRouter from "./routers/users.router.js";

const app = express();

app.use("",usersRouter)


app.get("/",  (req, res) => {
    res.send("Hello World!");
});




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});