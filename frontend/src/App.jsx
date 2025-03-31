import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Layout from './layouts/Layout/Layout';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // ใช้สถานะสำหรับเช็คว่า login เสร็จแล้วหรือยัง
  const navigate = useNavigate();

  // ฟังก์ชันที่ใช้เมื่อ login สำเร็จ
  const handleLogin = () => {
    setIsLoggedIn(true);  // เมื่อ login สำเร็จ
    navigate('/layout');  // เปลี่ยนเส้นทางไปที่ Layout
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/layout" element={isLoggedIn ? <Layout /> : <Login onLogin={handleLogin} />} />
      </Routes>
    </BrowserRouter>
  );
}