import express, { response } from "express";
import session from "express-session";
import cookieParser from "cookie-parser";

const app = express();

app.use(session(
    {
        secret:"codesnippet",
        saveUninitialized: false,
        resave: false,
        cookie:{
            maxAge: 1000 * 60 * 60 
        }
    }
))

app.use(cookieParser("codesnippet"));



app.get("/", (req, res) => {
    
    console.log(req.session);
    console.log(req.session.id);
    req.session.visited = true;
    res.cookie("username", "codesnippet", {signed: true ,maxAge: 1000 * 60 * 60});
    res.send("Hello World");
});


app.listen(3000, () => {
    console.log("Server is running on port http://localhost:3000");
});