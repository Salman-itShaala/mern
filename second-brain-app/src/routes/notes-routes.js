import { Router } from "express";
import { getAllNotes } from "../controllers/notes-controller.js";
import authMiddleware from "../middlewares/auth-middleware.js";
// function notes-controller.js

const notesRouter = Router();

// token 


notesRouter.use(authMiddleware);

notesRouter.get("/", getAllNotes);
// notesRouter.post("/save", saveNote);
// notesRouter.put("/save/:id", updateNote);
// notesRouter.delete("/save/:id", deleteNote);

export default notesRouter;