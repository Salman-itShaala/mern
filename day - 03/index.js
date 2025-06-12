const { connect, Schema, model } = require("mongoose");

connect("mongodb+srv://salmanshaikh:n72L9oN54khi0vBJ@cluster0.oqtuyuo.mongodb.net/classes")
    .then(() => console.log("Connected to db"))
    .catch(err => console.log("Something went wrong", err));


const studentsSchema = new Schema({
    studentsName: String,
    age: Number
});


const Student = model("Student", studentsSchema);

async function insertStudent() {
    const student = new Student({ studentsName: "Ram", age: 20 });

    const savedStudent = await student.save();

    console.log("student saved", savedStudent);
}

async function getStudent() {

    const student = await Student.find().sort({ age: 1 });

    console.log(student);

}

async function updateAge() {
    const student = await Student.updateOne({ studentsName: "Ram" }, { age: 25 });
    console.log("Student updated");
}


async function deleteStudent() {
    const student = await Student.deleteOne({ studentsName: "Ram" });

    console.log("Student deleted");
}

deleteStudent();