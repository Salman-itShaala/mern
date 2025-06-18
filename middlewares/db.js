import { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
})

export const User = model("User", userSchema);

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: Schema.ObjectId, ref: "User", required: true }
})

export const Todo = model("Todo", todoSchema);

