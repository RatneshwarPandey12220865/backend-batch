import express from "express";

const app = express();

// **Middleware**

function isAuthenticated(req , res, next){
    const token = req.headers.authorization;

    if(token === "valid-user"){
        req.user = {
            name: "John Doe",
            email: "example@EMAIL.COM",
            role: "ADMIN",
            permissions: ["READ", "WRITE", "DELETE"],

        };
        next();
    }
    else{
        res.status(401).send("Unauthorized");
    }
}

function logger(req, res, next){
    console.log("Request received at: ", new Date() , "for route", req.originalUrl , "with method", req.method); 
    next();
}

app.use(logger);

function maintenanceMode(req, res, next) {
    const isUnderMaintenance = true; // Toggle this to enable/disable maintenance mode
    if (isUnderMaintenance) {
      res.status(503).send('The site is under maintenance. Please try again later.');
    } else {
      next(); // Proceed if not under maintenance
    }
  }

app.use(maintenanceMode);

app.get("/",  (req, res) => {
    res.send("Hello World!");
});

app.get("/api/v1/login" ,isAuthenticated , (req , res)=>{
    const {user} = req;
    res.status(200).send({
        user,
        message: "Login Success"

    });
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
