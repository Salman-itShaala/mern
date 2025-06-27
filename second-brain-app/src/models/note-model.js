import { model, Schema } from "mongoose";

// schema
const notesSchema = new Schema({
    title: { type: String, required: true },
    tag: { type: String, },
    url: { type: String, required: true },
    userId: { type: Schema.ObjectId, required: true }
});


// model

const Note = model("Note", notesSchema);

export default Note;