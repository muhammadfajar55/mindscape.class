const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    if (results.length === 0)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login berhasil", user: results[0] });
  });
});

router.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  const query = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, password], (err, result) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    res.json({ message: "Register berhasil" });
  });
});

module.exports = router;
