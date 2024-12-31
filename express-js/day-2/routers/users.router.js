// Create routers for users
import { Router } from 'express';

const usersRouter = Router();


usersRouter.get("/", (req, res) => {
    res.send("Users Route");
});


usersRouter.get("/profile", (req, res) => {
    res.send("Profile Route");
});

export default usersRouter;


