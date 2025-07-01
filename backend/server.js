const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users"); // ✅ tambahkan ini

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // ✅ daftarkan route users

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
