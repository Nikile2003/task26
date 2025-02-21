const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nikile2003@",
    database: "support_ticket_system"
});

db.connect(err => {
    if (err) console.error("Database connection failed:", err);
    else console.log("Connected to MySQL");
});

app.get("/tickets", (req, res) => {
    db.query("SELECT * FROM tickets", (err, results) => {
        if (err) return res.status(500).json(err);
        res.json(results);
    });
});

app.post("/tickets", (req, res) => {
    const { subject, description } = req.body;
    db.query("INSERT INTO tickets (subject, description) VALUES (?, ?)", [subject, description], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Ticket created", id: result.insertId });
    });
});

app.delete("/tickets/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM tickets WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Ticket deleted" });
    });
});

app.listen(5000, () => console.log("Server running on port 5000"));
