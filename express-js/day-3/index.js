import express from "express";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("secret"));

app.get("/", (req, res) => {
    res.cookie("name", "express" , {
        maxAge:1000 * 60 * 60 * 24,
       signed:true
    })
  res.send("Hello World");
});

app.get("/products", (req, res) => {
    console.log(req.cookies)
    console.log(req.signedCookies)

    if(req.cookies.name && req.cookies.name === "express"){
        res.send({
            id:1,
            name:"product",
            price:100,
        })
    }

    res.send("You are not authorized to view this page")
    
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});