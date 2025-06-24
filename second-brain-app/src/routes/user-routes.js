import { Router } from "express";
import { handleGetReq, handleLoginReq, handleSignupReq, } from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.get("/", handleGetReq);
userRouter.get("/login", handleLoginReq);
userRouter.get("/signup", handleSignupReq);

export default userRouter;
