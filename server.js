const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();

const port = 3000;

app.use(cors({
    origin: 'http://127.0.0.1:5500',
}));

app.use(bodyParser.json());
app.use(express.static('public'));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'studentdb'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

app.get("/api/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) throw err;
        console.log(result);
        res.json(result);
    });
});


app.post("/api/users", (req, res) => {
    const { name, email, message } = req.body;
    db.query("INSERT INTO users (name, email, message) VALUES (?, ?, ?)", [name, email, message], (err, result) => {
        if (err) throw err;
        res.json({ message: "User added successfully" });
    });
});


app.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
        if (err) throw err;
        res.json({ message: "User deleted successfully" });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
