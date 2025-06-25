import { Router } from "express";
import userRouter from "./user-routes.js";
import notesRouter from "./notes-routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/notes", notesRouter);

export default router;