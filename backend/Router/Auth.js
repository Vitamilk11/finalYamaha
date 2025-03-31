const express = require("express");
const router = express.Router();
const db = require("../DB");
const bcrypt = require("bcrypt");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  const { username, password, phone } = req.body;

  if (!username || !password || !phone) {
    return res.status(400).json({ message: "❌ Missing fields" });
  }

  if (username.length < 3 || password.length < 6) {
    return res.status(400).json({ message: "❌ Username or password too short" });
  }

  if (!/^\d{10}$/.test(phone)) {
    return res.status(400).json({ message: "❌ Invalid phone number" });
  }

  const checkSql = "SELECT * FROM users WHERE username = ?";
  db.query(checkSql, [username], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length > 0) {
      return res.status(400).json({ message: "❌ Username already exists" });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) return res.status(500).json({ message: "❌ Password hashing error" });

      const sql = "INSERT INTO users (username, password, phone) VALUES (?, ?, ?)";
      db.query(sql, [username, hashedPassword, phone], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({
          message: "✅ Register success",
          user: {
            user_id: result.insertId,
            username: username,
          },
        });
      });
    });
  });
});

// ✅ LOGIN
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const sql = "SELECT * FROM users WHERE username = ?";

  db.query(sql, [username], async (err, result) => {
    if (err) return res.status(500).json({ message: "❌ Server error" });

    if (result.length === 0) {
      return res.status(401).json({ message: "❌ User not found" });
    }

    try {
      const isMatch = await bcrypt.compare(password, result[0].password);
      if (isMatch) {
        res.json({
          message: "✅ Login success",
          user: {
            id: result[0].user_id,
            username: result[0].username,
            phone: result[0].phone,
          },
        });
      } else {
        res.status(401).json({ message: "❌ Invalid password" });
      }
    } catch (compareErr) {
      console.error("bcrypt compare error:", compareErr);
      res.status(500).json({ message: "❌ Error comparing password" });
    }
  });
});

module.exports = router;
