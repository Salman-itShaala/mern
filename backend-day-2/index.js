import express from "express";

const app = express(); // http server 

app.use(express.json());

const todos = [
    { id: 1, title: "excercise daily" },
    { id: 2, title: "learn front end dev" },
    { id: 3, title: "Read one book" }
];

app.get("/todos", (req, res) => {
    res.send({ todosArr: todos });
})

// query param
app.get("/todo", (req, res) => {
    const id = req.query.id;
    console.log(id);

    res.send({ msg: `sending todo with id ${id}` });
})


app.get("/random", (req, res) => {
    const name = req.headers.name;

    console.log(name)

    res.send(name);
})


app.get("/random2", (req, res) => {
    const body = req.body;

    console.log(body)

    res.send(body);
})

app.listen(3000, () => {
    console.log("app is running on port 3000");
});