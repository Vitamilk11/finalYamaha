import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import Layout from './layouts/Layout/Layout'; // 👈 เปลี่ยนกลับมาใช้ Layout

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/layout" // 👈 เปลี่ยน path กลับเป็น layout
        element={
          isLoggedIn ? <Layout /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  );
}

export default App;
