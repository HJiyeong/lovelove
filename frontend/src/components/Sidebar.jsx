// src/components/Sidebar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";   // ⬅️ 추가

function Sidebar() {
  const { isAuth, logout } = useAuth();              // ⬅️ 가져오기
  const navigate = useNavigate();

  const navItems = [
    { label: "메인", path: "/" },
    { label: "연애 고수의 조언", path: "/search" },
    { label: "데이트 장소", path: "/dateplace" },
    { label: "나의 다이어리", path: "/calendar" },
    { label: "설정", path: "/settings" },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-[#ffd9e0] via-[#f5d5f3] to-[#d9e4ff] p-6 shadow-xl text-black flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">
      <div>
        {/* 로고 헤더 */}
        <div className="flex items-center gap-3 animate-fadeInOut mb-10">
          <img src="/img_5.png" alt="Logo" className="w-[3.8rem] h-[3.8rem] object-contain" />
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#e37571] via-[#e37571] to-[#b8baed] text-transparent bg-clip-text drop-shadow-md">
            꼬셔조
          </h1>
        </div>

        {/* 소개 문구 */}
        <div className="text-[14px] leading-snug px-3 py-1 mb-6 space-y-2">
          <p className="font-semibold">연애는 기술이 아니라 관계입니다.</p>
          <p className="text-black/80">
            그래서 우리는 조언보다 먼저 <br /> 당신의 이야기를 듣는 것부터 시작합니다.
          </p>
          <div className="pt-2 border-t border-white/20">
            <p className="font-semibold mt-2">방향만 알려주는 네비가 아닙니다.</p>
            <p className="text-black/80">
              길을 같이 걸어주는 <span className="text-[#d66d69] font-semibold">큐피(Qupy)</span>입니다.
            </p>
          </div>
        </div>

        {/* 내비게이션 */}
        <nav className="flex flex-col gap-3">
          {isAuth
            ? navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className="rounded-xl px-4 py-2 hover:bg-white/10 transition flex items-center gap-3 font-medium"
                >
                  {label}
                </Link>
              ))
            : null}
        </nav>
      </div>

      {/* 하단 버튼: 로그인 또는 로그아웃 */}
      <div className="mt-8">
        {isAuth ? (
          <button
            onClick={() => logout()}
            className="w-full rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 font-medium"
          >
            로그아웃
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full rounded-xl bg-white/10 hover:bg-white/20 px-4 py-2 font-medium"
          >
            로그인
          </button>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
