import express from "express";
import connectToMongo from "./config/db.js";
import router from "./routes/index.js";
import cors from "cors";
import { config } from "dotenv";

const app = express();

config();
connectToMongo();


app.use(cors());
app.use(express.json());

app.use("/api/v1", router);

app.listen(3000, () => {
    console.log("Application is running on port 3000");
});