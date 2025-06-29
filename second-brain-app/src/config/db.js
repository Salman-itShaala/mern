import { connect } from "mongoose";

async function connectToMongo() {
    try {
        await connect(process.env.MONGODB_URL);
        console.log("Connected to mongoDb");
    } catch (error) {
        console.log("Error while connecting to mongoDb", error);
    }
}

export default connectToMongo;