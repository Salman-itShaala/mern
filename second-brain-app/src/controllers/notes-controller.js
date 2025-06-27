import Note from "../models/note-model.js";

export async function getAllNotes(req, res) {
    const userId = req.userId;

    try {
        const notes = await Note.find({ userId });
        res.status(200).json({ message: "All notes", notes })
    } catch (error) {
        console.log("Error in get all notes route", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function saveNote(req, res) {
    const userId = req.userId;
    const body = req.body;
    const title = body.title;
    const tag = body.tag;
    const url = body.url;

    if (!title || !tag || !url) {
        res.status(403).json({ message: "All fields are required" });
    }

    try {
        const note = new Note({ title, tag, userId, url });

        await note.save();

        res.status(201).json({ message: "Note saved succesfully", note });

    } catch (error) {
        console.log("Error in saving notes route", error);
        res.status(500).json({ message: "Internal server error" });
    }

}