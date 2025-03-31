const express = require("express");
const router = express.Router();
const db = require("../DB");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone) {
    return res.status(400).json({ message: "❌ Missing fields" });
  }

  // ตรวจสอบความยาว username และ password
  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: "❌ Username or password too short" });
  }

  // ตรวจสอบว่า phone เป็นตัวเลข
  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "❌ Invalid phone number" });
  }

  // ตรวจสอบว่า username ซ้ำ
  const checkSql = "SELECT * FROM users WHERE username = ?";
  db.query(checkSql, [username], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      return res.status(400).json({ message: "❌ Username already exists" });
    }

    // ถ้าไม่ซ้ำ, ทำการเข้ารหัส password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "❌ Password hashing error" });

      const sql = "INSERT INTO users (username, password, phone) VALUES (?, ?, ?)";
      db.query(sql, [username, hashedPassword, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          message: "✅ Register success",
          user: {
            user_id: result.insertId,  // ส่ง user_id กลับ
            username: username
          }
        });
      });
    });
  });
});

// Login (ยังคงเหมือนเดิม)
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(401).json({ message: "❌ User not found" });

    const isMatch = await bcrypt.compare(password, result[0].password);
    if (isMatch) {
      res.json({
        message: "✅ Login success",
        user: {
          id: result[0].user_id,
          username: result[0].username
        }
      });
    } else {
      res.status(401).json({ message: "❌ Invalid password" });
    }
  });
});

module.exports = router;
