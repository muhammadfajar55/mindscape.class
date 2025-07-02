const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all users
router.get("/", (req, res) => {
  db.query("SELECT id, name, email FROM users", (err, results) => {
    if (err) return res.status(500).json({ message: "DB error", err });
    res.json(results);
  });
});

module.exports = router;
