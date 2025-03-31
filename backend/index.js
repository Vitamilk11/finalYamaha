const express = require("express");
const cors = require("cors");
const authRoutes = require("./Router/Auth"); // ✅ เรียกใช้ route จาก Auth.js

const app = express();
const PORT = 3006;

// Middleware
app.use(cors());
app.use(express.json()); // ใช้ express.json() แทน bodyParser.json()

// ✅ เชื่อมเส้นทางที่เขียนไว้ใน Router/Auth.js
app.use(authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
