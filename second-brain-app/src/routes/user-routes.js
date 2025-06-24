import { Router } from "express";
import { handleGetReq, login, signup } from "../controllers/user-controllers.js";

const userRouter = Router();


userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.get("/", handleGetReq)

export default userRouter;
