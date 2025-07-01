const db = require("../db");

const createUser = (email, password, callback) => {
  const sql = "INSERT INTO users (email, password) VALUES (?, ?)";
  db.query(sql, [email, password], callback);
};

const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};

const getAllUsers = (callback) => {
  const sql = "SELECT id, email FROM users";
  db.query(sql, callback);
};

module.exports = { createUser, findUserByEmail, getAllUsers };
