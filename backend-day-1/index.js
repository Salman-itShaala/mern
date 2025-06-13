const express = require('express');
const app = express();

app.get('/signup', (req, res) => {
    res.json({ msg: "hello there" });
});

app.post('/', (req, res) => {
    res.send('Got a POST request')
})

app.listen(3001, () => {
    console.log(`Example app listening on port ${3001}`);
})
