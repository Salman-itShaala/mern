import express from "express";
import { connect } from "mongoose";
import { User } from "./db.js";

const dbUrl = "mongodb+srv://salmanshaikh:n72L9oN54khi0vBJ@cluster0.oqtuyuo.mongodb.net/todo-app";

await connect(dbUrl);

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
    const userName = req.body.userName; // {userName : "", email : "", password : ""} 
    const email = req.body.email;
    const password = req.body.password;

    // handle if any of the field is absent --> validation

    if (!userName || !email || !password) {
        res.status(400).send({ message: "Required all fields" });
        return;
    }

    try {
        const user = new User({ userName, email, password });

        const savedUser = await user.save();

        res.status(201).send({ message: "User saved succesfully", savedUser });

    } catch (error) {
        console.log("Error occured in signup route", error);
        res.status(500).send({ message: "Internal server error" });
    }

})


app.listen(3000, () => {
    console.log("App is runninig on port 3000");
})