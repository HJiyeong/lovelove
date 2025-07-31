// src/components/Sidebar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import { Home, BookOpen, MapPin, CalendarDays } from "lucide-react";

/* ── 네비게이션 항목 정의 ───────────────────────────── */
const menu = [
  { label: "메인",           to: "/",         icon: Home },
  { label: "연애 고수의 조언", to: "/search",    icon: BookOpen },
  { label: "데이트 장소",     to: "/dateplace", icon: MapPin },
  { label: "나의 다이어리",   to: "/calendar",  icon: CalendarDays },
];

/* ── 사이드바 컴포넌트 ──────────────────────────────── */
export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-[#ffd9e0] via-[#f5d5f3] to-[#d9e4ff] shadow-xl text-black flex flex-col rounded-tr-3xl rounded-br-3xl">

      {/* ─── 로고 & 태그라인 ─────────────────────────── */}
      <div className="px-6 pt-10">
        <div className="flex items-center gap-4 animate-fadeInOut">
          {/* 이미지 크기 ↑ */}
          <img
            src="/img_5.png"
            alt="Logo"
            className="w-16 h-16 object-contain"
          />
          {/* 글씨 크기 ↑ */}
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#e37571] via-[#e37571] to-[#b8baed] text-transparent bg-clip-text drop-shadow-md">
            꼬셔조
          </h1>
        </div>

        <div className="mt-8 space-y-4 text-[15px] leading-snug">
          <p className="font-semibold">
            연애는 <span className="text-[#d66d69]">기술</span>이 아니라 관계입니다.
          </p>
          <p className="text-black/80">
            그래서 우리는 <br />
            조언보다 먼저 <b>당신의 이야기</b>를 듣는 것부터 시작합니다.
          </p>
          <p className="pt-2 border-t border-white/20">
            길을 같이 걸어주는{" "}
            <span className="text-[#d66d69] font-semibold">큐피(Qupy)</span>
            입니다.
          </p>
        </div>
      </div>

      {/* ─── 네비게이션 버튼 ─────────────────────────── */}
      <nav className="mt-12 flex-1 px-4 space-y-2">
        {menu.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              [
                "group flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition-all",
                isActive
                  ? "bg-white/25 shadow-inner backdrop-blur-sm"
                  : "hover:bg-white/15 hover:-translate-y-0.5",
              ].join(" ")
            }
          >
            <Icon
              size={20}
              className="shrink-0 text-[#d66d69] group-hover:scale-110 transition"
            />
            <span className="truncate">{label}</span>
          </NavLink>
        ))}
      </nav>

      {/* ─── 푸터(선택사항) ────────────────────────────── */}
      <div className="px-6 pb-8 text-xs text-black/50">
        © 2025 Qupy.다인지영
      </div>
    </aside>
  );
}
