import express from "express";
import { connect } from "mongoose";
import { Todo, User } from "./db.js";

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


app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email, password });

        if (!user) {
            res.status(404).json({ message: "Invalid credentials" });
            return;
        }

        res.status(200).json({ message: "login successfull", user });

    } catch (error) {
        console.log("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
})

// route to save todo

app.post("/save-todo", async (req, res) => {
    const userId = req.body.userId;
    const title = req.body.title;
    const description = req.body.description;

    if (!userId || !title || !description) {
        res.status(400).json({ message: "Required all fields" });
        return;
    }

    // id if user exists or not
    // bad req


    try {
        const todo = new Todo({ title, description, userId });

        const savedTodo = await todo.save();

        res.status(201).json({ message: "Todo saved succesfully", savedTodo });

    } catch (error) {
        console.log("Error in save-todo route", error);
        res.status(500).json({ message: "Internal server error" });
    }


})


app.listen(3000, () => {
    console.log("App is runninig on port 3000");
})