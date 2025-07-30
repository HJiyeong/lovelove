// src/pages/LoginPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/auth/login", { email, password });
      login(data.accessToken); // context + localStorage
      navigate("/");           // 메인으로
    } catch (err) {
      alert("로그인 실패 😭");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="w-80 space-y-4">
        <h2 className="text-2xl font-bold mb-4 text-center">로그인</h2>
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg border"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg border"
        />
        <button type="submit" className="w-full p-3 bg-[#e37571] rounded-lg text-white font-semibold">
          로그인
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
