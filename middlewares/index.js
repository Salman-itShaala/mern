import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";
import { connect } from "mongoose";
import { Todo, User } from "./db.js";

config();

await connect(dbUrl);

const app = express();


const dbUrl = process.env.MONGODB_URL;

const jwtSecret = process.env.JWT_SECRET;


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

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ userName, email, password: hashedPassword });

        const savedUser = await user.save();

        const userId = savedUser._id;

        const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });

        res.status(201).send({ message: "User saved succesfully", user: { token: token, userName: savedUser.userName } });

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

        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({ message: "Invalid credentials" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {

            const userId = user._id;

            const token = jwt.sign({ id: userId }, jwtSecret, { expiresIn: "1h" });

            res.status(200).json({ message: "login successfull", user: { token: token, userName: user.userName } });
        } else {
            res.status(404).json({ message: "Invalid credentials" });
        }


    } catch (error) {
        console.log("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
})


// middleware

function authMiddleware(req, res, next) {
    const token = req.headers.token;

    //

    const user = jwt.verify(token, jwtSecret); // {id}

    //

    const userId = user.id;

    // userId 

    req.userId = userId;

    next();

}

// route to save todo

app.post("/save-todo", authMiddleware, async (req, res) => {
    const userId = req.userId;
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


});

// assignment

// userId

app.get("/todos", authMiddleware, async (req, res) => {

    const userId = req.userId;

    if (!userId) {
        res.status(400).json({ message: "User id is required" });
        return;
    }

    try {

        const todos = await Todo.find({ userId });

        res.status(200).json({ message: "Todo fetched successfully", todos });
    } catch (error) {
        console.log("Error in get todos route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// userId

app.delete("/todo/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;

    if (!id || !userId) {
        res.status(400).json({ message: "All fields are required" })
        return;
    }

    try {

        await Todo.deleteOne({ _id: id, userId: userId });

        res.status(200).json({ message: "Todo deleted succesfully" });

    } catch (error) {
        console.log("Error in delete route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

app.put("/todo/:id", authMiddleware, async (req, res) => {
    const id = req.params.id;
    const userId = req.userId;
    const newTitle = req.body.title;
    const newDescription = req.body.description;

    if (!id || !userId || !newTitle || !newDescription) {
        res.status(400).json({ message: "All fields are required" })
        return;
    }

    try {

        const updatedTodo = await Todo.updateOne({ _id: id, userId: userId }, { title: newTitle, description: newDescription });

        res.status(201).json({ message: "Todo updated succesfully" });


    } catch (error) {
        console.log("Error in delete route", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


app.listen(3000, () => {
    console.log("App is runninig on port 3000");
})