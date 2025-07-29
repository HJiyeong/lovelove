import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans">
      {/* 사이드바 */}
      <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#f1e0e2] to-[#ffeded] text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl
">
        <div>
          <h1 className="text-2xl font-bold mb-10">꼬셔조</h1>
          <nav className="flex flex-col gap-3">
            {[
              { to: "/", label: "메인" },
              { to: "/search", label: "진로 검색" },
              { to: "/dateplace", label: "진로 백과사전" },
              { to: "/calendar", label: "진로 캘린더" },
              { to: "/settings", label: "설정" },
              { to: "/logout", label: "로그아웃" },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="bg-purple-700 rounded-lg px-4 py-2 hover:bg-purple-600 transition cursor-pointer"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 bg-purple-700 p-4 rounded-lg text-center">
          <p className="text-sm mb-2">진로 탐색 프로그램</p>
          <button className="bg-white text-purple-700 px-4 py-2 rounded-full text-sm font-bold hover:bg-gray-100 transition">
            TRY NOW
          </button>
        </div>
      </aside>

      {/* 메인 컨텐츠 */}
      <main className="flex-1 p-10">
        {/* 검색창 + AI 튜터 안내 */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center bg-white rounded-full shadow-md px-4 w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 py-2 outline-none text-gray-700"
            />
            <button className="text-gray-400 hover:text-gray-600">🔍</button>
          </div>
          <div className="flex items-center">
            <Link
              to="/chat"
              className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow hover:scale-105 hover:bg-purple-100 transition cursor-pointer"
            >
              <div className="text-2xl">💬</div>
              <div className="text-sm text-purple-700 font-semibold">
                AI 튜터에게<br />무엇이든 물어보세요!
              </div>
            </Link>
          </div>
        </div>

        {/* 메인 카드 섹션 */}
        <section className="grid grid-cols-3 gap-6 mb-12">
          <Link to="/dateplace">
            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-6 rounded-xl shadow-md text-black font-bold text-xl hover:scale-105 transition cursor-pointer">
              커리어 백과사전
              <div className="text-right text-2xl">🤍</div>
            </div>
          </Link>
          <Link to="/test">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 p-6 rounded-xl shadow-md text-black font-bold text-xl hover:scale-105 transition cursor-pointer">
              AI 기반 진로 적성 검사
              <div className="text-right text-2xl">🤍</div>
            </div>
          </Link>
          <Link to="/milestone">
            <div className="bg-gradient-to-r from-cyan-400 to-purple-300 p-6 rounded-xl shadow-md text-black font-bold text-xl hover:scale-105 transition cursor-pointer">
              커리어 마일스톤
              <div className="text-right text-2xl">🤍</div>
            </div>
          </Link>
        </section>

        {/* ✅ 마이페이지 (단독, 크게) */}
        <section className="mb-12">
          <Link to="/mypage-detail">
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg hover:scale-105 transition transform cursor-pointer">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">마이페이지</h2>

              {/* 그래프 이미지 */}
              <div className="w-full mb-8 rounded-xl overflow-hidden shadow-md">
                <img
                  src="/graph-design.png"
                  alt="진로 활동 그래프"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </Link>
        </section>

        {/* ✅ 연결된 직무 / 직무진단서 / 진로활동 */}
        <section className="grid grid-cols-3 gap-6 mb-12">
  <Link to="/job-links">
    <div className="bg-blue-100 rounded-xl shadow-md p-6 hover:bg-blue-200 hover:shadow-lg hover:scale-105 transition transform cursor-pointer text-center">
      <h3 className="text-lg font-bold mb-2 text-blue-900">연결된 직무</h3>
      <p className="text-2xl font-bold text-purple-700">24</p>
    </div>
  </Link>

  <Link to="/diagnosis">
    <div className="bg-blue-100 rounded-xl shadow-md p-6 hover:bg-blue-200 hover:shadow-lg hover:scale-105 transition transform cursor-pointer text-center">
      <h3 className="text-lg font-bold mb-2 text-blue-900">직무진단서</h3>
      <p className="text-2xl font-bold text-purple-700">15</p>
    </div>
  </Link>

  <Link to="/activities">
    <div className="bg-blue-100 rounded-xl shadow-md p-6 hover:bg-blue-200 hover:shadow-lg hover:scale-105 transition transform cursor-pointer text-center">
      <h3 className="text-lg font-bold mb-2 text-blue-900">진로 활동</h3>
      <p className="text-2xl font-bold text-purple-700">17</p>
    </div>
  </Link>
</section>
      </main>
    </div>
  );
}

export default Home;
