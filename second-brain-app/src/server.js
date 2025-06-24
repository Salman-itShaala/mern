import express from "express";
import connectToMongo from "./config/db.js";
import router from "./routes/index.js";

const app = express();

connectToMongo();

app.use("/api", router);

app.listen(3000, () => {
    console.log("Application is running on port 3000");
});