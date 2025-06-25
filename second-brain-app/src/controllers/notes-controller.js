export function getAllNotes(req, res) {
    console.log(req.userId);
    res.send("Sending all notes", req.userId);
}