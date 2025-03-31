import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

// ✅ เพิ่ม prop setIsLoggedIn เข้ามา
export default function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3006/login", {
        username,
        password,
      });

      if (res.data.message.includes("success")) {
        ;

        // ✅ บอก App ว่าล็อกอินแล้ว
        setIsLoggedIn(true);

        // ✅ เก็บข้อมูลผู้ใช้
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // ✅ เปลี่ยนเส้นทางไปหน้า layout
        navigate("/layout"); // 🔄 เปลี่ยนจาก /home → /layout
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      const msg = err.response?.data?.message || "❌ Login failed";
      alert(msg);
      console.error("Login error:", err);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <img
            src="yamaha-logo.png"
            alt="Yamaha Logo"
            style={{ width: "150px", height: "auto", borderRadius: "6px" }}
          />
        </div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
        <p className="register-link">
          ยังไม่มีบัญชี <Link to="/register">สมัครเลย</Link>
        </p>
      </form>
    </div>
  );
}
