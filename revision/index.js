import express from "express";

const app = express();

app.get("/api/v1", (req, res) => {
    res.send("Hii there 123");
})


app.listen(3000, () => {
    console.log("App is running");
})