import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecommendedSlide from "../components/RecommendedSlide";
import Sidebar from "../components/Sidebar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    if (term.includes("백과") || term.includes("진로")) {
      navigate("/dictionary");
    } else if (term.includes("전공")) {
      navigate("/search");
    } else if (term.includes("캘린더") || term.includes("일정")) {
      navigate("/calendar");
    } else if (term.includes("마이페이지")) {
      navigate("/mypage-detail");
    } else if (term.includes("검사") || term.includes("테스트")) {
      navigate("/testpage");
    } else {
      navigate("/search");
    }
  };

  const handleChatClick = () => navigate("/chat");
  const handleMouseEnter = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 10);
  };

  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-sans relative">
      <Sidebar />
      <main className="flex-1 p-10">
        {/* Hero Section */}
        <section className="relative mb-16 rounded-3xl bg-gradient-to-br from-[#ffeded] to-[#fff3ed] p-10 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* 왼쪽 텍스트 영역 */}
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-snug">
                나만을 위한
                <span className="text-[#b05a57]"> 맞춤형 연애 고민 상담</span>
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                부끄러운 고민도, 서툰 마음도 괜찮아요 !{" "}
                <span className="text-[#d66d69] font-semibold">AI 큐피</span>에게 모두 털어놔보세요.
              </p>

              <div
                onClick={handleChatClick}
                className="bg-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl hover:scale-105 transition cursor-pointer border border-[#fff3ed] mb-4"
              >
                <img src="/img_3.png" alt="AI 커비" className="w-16 h-16 rounded-xl border shadow-sm" />
                <div className="text-left">
                  <p className="text-sm text-gray-500">연애 고민 상담 도우미 큐피(Qupy)</p>
                  <p className="text-lg font-bold text-[#d66d69]">
                    <span className="inline-block bg-[#fff3ed] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition">
                      💬 지금 바로 상담해보세요
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed">
                연애 의지와 자신감을 되찾고 싶은가요?
                <br className="hidden sm:inline" />
                큐피는 당신의 이야기를 판단 없이 경청하며,
                솔직한 대화를 통해 마음의 짐을 함께 덜어드립니다.
              </p>
              <p className="mt-4 text-sm italic text-[#d66d69]">
                큐피(Qupy) = Cupid + Buddy.
              </p>
            </div>

            {/* 오른쪽 검색창 + 추천 슬라이드 */}
            <div className="flex flex-col items-end gap-6">
              <div className="w-full max-w-sm">
                <div className="flex items-center bg-white rounded-full shadow-md px-4">
                  <input
                    type="text"
                    placeholder="검색어를 입력하세요..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="flex-1 py-2 outline-none text-gray-700 bg-transparent"
                  />
                  <button onClick={handleSearch} className="text-gray-400 hover:text-gray-600 text-xl">🔍</button>
                </div>
              </div>

              <div className="w-full max-w-sm self-end ml-4">
                <RecommendedSlide />
              </div>
            </div>
          </div>
        </section>

        {/* 기능 카드 3개 */}
        <section className="grid grid-cols-3 gap-6 mb-16">
          {[
            {
              badge: '💘 진단',
              label: '연애 성향을 확인해봐요',
              to: '/testintro',
              color: 'from-[#e5d4f3] to-[#d4c1f4]',
              img: '/test.png',
            },
            {
              badge: '🫶 분석',
              label: '우리 대화를 들여다봐요',
              to: '/dictionary',
              color: 'from-[#f8d7e2] to-[#dfb7d8]',
              img: '/book.png',
            },
            {
              badge: '🎀 추천',
              label: '어울리는 스타일을 찾아봐요',
              to: '/milestone',
              color: 'from-[#d9e7f6] to-[#c1d4f0]',
              img: '/stop.png',
            },
          ].map(({ badge, label, to, color, img }) => (
            <Link to={to} key={to}>
              <div className={`relative bg-gradient-to-r ${color} p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:brightness-105 transition`}>
                <div className="absolute top-3 left-3 bg-white text-[#8b495a] text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-[#fff3ed]">
                  {badge}
                </div>
                <img src={img} alt={label} className="w-20 mb-4 mx-auto" />
                <p className="text-black text-xl font-bold text-center">{label}</p>
              </div>
            </Link>
          ))}
        </section>

      
      </main>
    </div>
  );
}

export default Home;
