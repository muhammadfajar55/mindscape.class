// routes/users.js
const express = require("express");
const db = require("../db"); // koneksi database
const router = express.Router();

// GET /api/users - Ambil semua user dari tabel "users"
router.get("/", (req, res) => {
  const sql = "SELECT id, email, password FROM users ORDER BY id ASC";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ msg: "DB Error" });
    }

    res.json(results); // kirim data ke frontend
  });
});

module.exports = router;
