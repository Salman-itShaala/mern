import express from "express";

const app = express();

app.post("/register", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const userName = req.body.userName;
})


app.listen(3000, () => {
    console.log("App is running on port 3000");
})