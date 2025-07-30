// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);

  /* 최초 마운트 시 localStorage → 메모리 */
  useEffect(() => {
    const saved = localStorage.getItem("accessToken");
    if (saved) setToken(saved);
  }, []);

  /* 로그인/로그아웃 util */
  const login = (newToken) => {
    localStorage.setItem("accessToken", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuth: !!token, token, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* 훅으로 바로 꺼내 쓰기 */
export const useAuth = () => useContext(AuthContext);
