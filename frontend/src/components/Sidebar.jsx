// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";


function Sidebar() {
  return (
    <aside className="w-64 bg-gradient-to-b from-[#ffd9e0] via-[#f5d5f3] to-[#d9e4ff] p-6 shadow-xl text-black flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">

      <div>
        <div className="flex items-center gap-3 animate-fadeInOut">
          <img src="/img_5.png" alt="Logo" className="w-[3.8rem] h-[3.8rem] object-contain" />
          <h1 className="text-6xl font-extrabold bg-gradient-to-r from-[#e37571] via-[#e37571] to-[#b8baed] text-transparent bg-clip-text drop-shadow-md">
            꼬셔조
          </h1>
        </div>

        <div className="text-[14px] text-black text-left leading-snug px-3 py-1 mb-6 space-y-2">
          <div>
            <p className="font-semibold text-black mb-1">연애는 기술이 아니라 관계입니다.</p>
            <p className="text-black/80">
              <span className="text-black">그래서 우리는 조언보다 먼저 <br /> 당신의 이야기를</span> 듣는 것부터 시작합니다.
            </p>
          </div>
          <div className="pt-2 border-t border-white/20">
            <p className="text-black font-semibold mt-2">
              방향만 알려주는 네비가 아닙니다.<br />
            </p>
            <p className="text-black/80">
              길을 같이 걸어주는 <span className="text-[#d66d69] font-semibold">큐피(Qupy)</span>입니다.
            </p>
          </div>
        </div>

        <nav className="flex flex-col gap-3">
          {["메인", "연애 고수의 조언", "데이트 장소", "나의 다이어리", "설정", "로그아웃"].map((label, idx) => (
            <Link
              key={idx}
              to={['/', '/search', '/dateplace', '/calendar', '/settings', '/logout'][idx]}
              className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}

export default Sidebar;
