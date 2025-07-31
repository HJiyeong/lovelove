
import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-16 px-8 grid grid-cols-[auto_1fr_auto] items-center bg-white/60 backdrop-blur-lg border-b border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)] rounded-bl-2xl z-50">
          <h1 className="text-xl font-bold text-rose-500 whitespace-nowrap">
            데이트&nbsp;장소&nbsp;
          </h1>
          <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
            {[
              ["연애 성향 테스트", "/testintro"],
              ["연락 분석", "/dictionary"],
              ["스타일 분석", "/milestone"],
            ].map(([label, path]) => (
              <Link
                key={label}
                to={path}
                className="relative text-gray-600 hover:text-pink-600 transition group"
                dangerouslySetInnerHTML={{ __html: label }}
              />
            ))}
            <Link
              to="/chat"
              aria-label="AI상담"
              className="px-4 py-2 rounded-full bg-rose-500 text-white shadow hover:bg-rose-600 hover:-translate-y-0.5 active:translate-y-0 transition transform whitespace-nowrap"
            >
              💬 연애상담 챗봇
            </Link>
          </nav>
        </header>
  );
}

export default Topbar;