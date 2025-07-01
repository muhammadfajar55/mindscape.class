const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  createUser,
  findUserByEmail,
  getAllUsers,
} = require("../models/userModel");

const router = express.Router();

// === REGISTER ===
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ msg: "DB Error" });
    if (results.length > 0) return res.status(400).json({ msg: "User exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    createUser(email, hashedPassword, (err) => {
      if (err) return res.status(500).json({ msg: "Register failed" });
      res.json({ msg: "User registered" });
    });
  });
});

// === LOGIN ===
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  findUserByEmail(email, async (err, results) => {
    if (err) return res.status(500).json({ msg: "DB Error" });
    if (results.length === 0)
      return res.status(404).json({ msg: "User not found" });

    const match = await bcrypt.compare(password, results[0].password);
    if (!match) return res.status(401).json({ msg: "Wrong password" });

    const token = jwt.sign({ id: results[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// === GET ALL USERS (for admin) ===
router.get("/users", (req, res) => {
  getAllUsers((err, results) => {
    if (err) return res.status(500).json({ msg: "Database error" });
    res.json(results);
  });
});

module.exports = router;
