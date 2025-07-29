// src/pages/Logout.jsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen font-sans">
      {/* 사이드바 */}
      <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
        <div>
          <div className="p-3 mb-10 pl-0">
            <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
          </div>
          <nav className="flex flex-col gap-3">
            {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
              <Link
                key={idx}
                to={["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx]}
                className="rounded-xl px-4 py-2 text-left hover:bg-black/10 transition cursor-pointer flex items-center gap-3 font-medium text-black text-lg"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>

      {/* 본문 */}
      <div className="flex-1 relative bg-gradient-to-br from-indigo-100 to-purple-100 pt-24 px-6 pb-12">
        {/* 헤더 */}
        <header className="fixed top-0 left-64 right-0 h-20 px-8 bg-white/60 backdrop-blur-lg border-b border-white/20 shadow z-50 grid grid-cols-[auto_1fr_auto] items-center">
          <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">로그아웃</h1>
          <div className="justify-self-center ml-48">
            <Link to="/" className="block">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                CareerNavi
              </span>
            </Link>
          </div>
          <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
            <Link to="/test" className="text-gray-600 hover:text-purple-600">적성검사</Link>
            <Link to="/dateplace" className="text-gray-600 hover:text-purple-600">커리어 백과사전</Link>
            <Link to="/milestone" className="text-gray-600 hover:text-purple-600">마일스톤</Link>
            <Link to="/chat" className="px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700">
              💬 AI커비와 상담하기
            </Link>
          </nav>
        </header>

        {/* 로그아웃 메시지 */}
        <div className="flex items-center justify-center h-full">
          <div className="bg-white shadow-xl rounded-3xl p-10 text-center max-w-md">
            <h2 className="text-2xl font-bold text-purple-700 mb-4">👋 로그아웃 되었습니다</h2>
            <p className="text-gray-600 mb-6">잠시 후 메인 페이지로 이동합니다...</p>
            <div className="animate-spin h-8 w-8 border-4 border-purple-300 border-t-transparent rounded-full mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

