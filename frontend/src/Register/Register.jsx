import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "", phone: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่าข้อมูลครบถ้วนหรือไม่
    if (!form.username || !form.password || !form.phone) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    try {
      const res = await axios.post("http://localhost:3006/register", form);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>📝 Register</h2>
        <input name="username" placeholder="Username" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <input name="phone" placeholder="Phone" onChange={handleChange} />
        <button type="submit">Register</button>
        <p className="back-login">
          มีบัญชีอยู่แล้ว? <Link to="/">เข้าสู่ระบบ</Link>
        </p>
      </form>
    </div>
  );
}
