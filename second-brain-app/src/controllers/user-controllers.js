import User from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "dotenv";

config();

export async function signup(req, res) {
    const body = req.body;

    const email = body.email;
    const userName = body.userName;
    const password = body.password;

    if (!email || !userName || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }

    // user save
    // check if user already exists with given email

    try {
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            res.status(400).send({ message: "User with given email already exists" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email: email, password: hashedPassword, userName: userName });

        const savedUser = await user.save();

        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" })

        res.status(201).json({ message: "Signup succesfully", token });
    } catch (error) {
        console.log("Error in signup handler", error);
        res.status(500).json({ message: "Internal server error" });
    }

}


export async function login(req, res) {
    const body = req.body;

    const email = body.email;
    const password = body.password;

    if (!email || !password) {
        res.json(400).json({ message: "Required all fields" });
        return;
    }

    try {
        const user = await User.findOne({ email: email });

        if (!user) {
            res.status(403).json({ message: "Invalid Credentials" });
            return;
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (isPasswordCorrect) {
            // generate jwt token and send it to front end
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.status(200).json({ message: "Login succesfull", token });
        } else {
            res.status(403).json({ message: "Invalid Credentials" });
            return;
        }
    } catch (error) {
        console.log("Error in login route", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
