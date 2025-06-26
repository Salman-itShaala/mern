import { MongoClient } from "mongodb";

// mongodb+srv://salmanshaikh:n72L9oN54khi0vBJ@cluster0.oqtuyuo.mongodb.net/

const client = new MongoClient("mongodb+srv://salmanshaikh:n72L9oN54khi0vBJ@cluster0.oqtuyuo.mongodb.net/");

async function main() {
    await client.connect();

    // if it's not present it'll create students db if it is present then we'll use
    const db = client.db("school");

    const students = db.collection("students");

    // await students.insertOne({ name: "abcd", age: 34, email: "abcd@gmail.com" });


    // await students.updateOne({ name: "abcd" }, { $set: { age: 35 } });

    const st1 = await students.findOne({ name: "abcd" });

    console.log(st1);

    await students.deleteOne({ name: "abcd" })
}

main();