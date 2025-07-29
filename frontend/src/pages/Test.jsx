import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";


function Test() {
    const navigate = useNavigate();

    const initialTests = [
        { name: "성향 검사", minutes: 15, path: "/test/personality", enabled: true },
        { name: "흥미 검사", minutes: 15, path: "/test/interest", enabled: true },
        { name: "활동 내역 분석", minutes: 10, path: "/test/activity", enabled: true },
        { name: "자기소개서 분석", minutes: 10, path: "/test/resume", enabled: true },
        { name: "희망 직업군 선택", minutes: 5, path: "/test/preference", enabled: true },
    ];

    const [tests, setTests] = useState(initialTests);

    const toggleTest = (index) => {
        const updated = [...tests];
        updated[index].enabled = !updated[index].enabled;
        setTests(updated);
    };

    return (
        <div className="flex min-h-screen font-sans">
            {/* 🟣 사이드바 */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 flex items-start justify-start pl-0 cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(["/", "/search", "/dictionary", "/calendar", "/settings", "/logout"][idx])}
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 🎯 메인 콘텐츠 */}
            <div className="flex-1 relative bg-gradient-to-br from-purple-50 to-indigo-100 pt-24 px-6 pb-20">
                {/* 상단 고정 바 */}
                <header
                    className="
            fixed top-0 left-64 right-0
            h-16 px-8
            grid grid-cols-[auto_1fr_auto] items-center
            bg-white/60 backdrop-blur-lg
            border-b border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]
            rounded-bl-2xl z-50
          "
                >
                    {/* 페이지 타이틀 (좌) */}
                    <h1 className="text-xl font-bold text-purple-600 whitespace-nowrap">
                        AI 기반 진로 적성 검사
                    </h1>

                    {/* 네비 / CTA (우) */}
                    <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
                        {[
                            ["적성검사", "/test"],
                            ["커리어&nbsp;백과사전", "/dictionary"],
                            ["마일스톤", "/milestone"],
                        ].map(([label, path]) => (
                            <Link
                                key={label}
                                to={path}
                                className="relative text-gray-600 hover:text-purple-600 transition group"
                                dangerouslySetInnerHTML={{ __html: label }}
                            >
                                {/* label은 innerHTML로 렌더링 */}
                            </Link>
                        ))}

                        <Link
                            to="/chat"
                            aria-label="AI커비와 상담하기"
                            className="
                px-4 py-2 rounded-full
                bg-purple-600 text-black
                shadow hover:bg-purple-700
                hover:-translate-y-0.5 active:translate-y-0
                transition transform whitespace-nowrap
              "
                        >
                            💬 AI커비와 상담하기
                        </Link>
                    </nav>
                </header>

                {/* 👇 여기부터 소개 영역 */}
                <div className="max-w-3xl mx-auto mb-8">
                    <h1 className="text-3xl font-bold text-purple-700 mb-2">AI 진단 테스트 시작하기</h1>
                    <div className="bg-gradient-to-r from-purple-100 to-indigo-100 border border-[#fff3ed] rounded-xl p-4 shadow text-sm text-gray-700 leading-relaxed">
                        커리어네비는 여러분의 <span className="font-semibold text-purple-600">성향과 이력, 목표</span>를 바탕으로 진로 설계를 도와드립니다.
                        <br />
                        아래에서 원하는 진단을 선택하고 시작해보세요! 결과는 언제든 다시 확인할 수 있어요. 🚀
                    </div>
                </div>

                {/* 중앙 콘텐츠 */}
                <div className="max-w-3xl mx-auto">
                    {/* 🔍 돋보기 이미지 (좌측 하단 배경) */}
                    <img
                        src="/img_6.png"
                        alt="돋보기"
                        className="absolute left-[80px] bottom-[-10px] w-80 opacity-80 z-0"

                    />

                    {/* 📁 폴더 이미지 (우측 하단 배경) */}
                    <img
                        src="/img_7.png"
                        alt="폴더"
                        className="absolute right-[150px] bottom-200px] w-60 opacity-0 z-0"
                    />
                    {/* 💻 가짜 브라우저 틀 */}
                    <div className="relative z-10 bg-white border border-[#fff3ed] rounded-2xl shadow-2xl overflow-hidden">

                        {/* 📎 브라우저 헤더 */}
                        <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 border-b border-[#fff3ed]">
                            <div className="w-3 h-3 bg-red-400 rounded-full shadow-inner" />
                            <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-inner" />
                            <div className="w-3 h-3 bg-green-400 rounded-full shadow-inner" />
                            <span className="ml-4 text-sm font-medium text-purple-700 tracking-tight">김교육님의 커리어 진단 공간</span>
                        </div>

                        {/* 🧠 검사 콘텐츠 */}
                        <div className="p-8 space-y-6 bg-gradient-to-br from-white via-purple-50 to-indigo-50">
                            {tests.map((test, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100 hover:shadow-md transition"
                                >
                                    <div>
                                        <div className="text-base font-medium text-gray-900 tracking-tight">{test.name}</div>
                                        <div className="text-xs text-gray-500">{test.minutes} minutes</div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* ✅ 세련된 토글 */}
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={test.enabled}
                                                onChange={() => toggleTest(idx)}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-indigo-500 transition-colors duration-300">
                                                <div className="absolute left-[2px] top-[2px] h-5 w-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform duration-300" />
                                            </div>
                                        </label>

                                        {/* ▶ Play 버튼 개선 */}
                                        <button
                                            onClick={() => navigate(test.path)}
                                            disabled={!test.enabled}
                                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all shadow-sm ${
                                                test.enabled
                                                    ? "bg-white text-purple-600 border border-purple-400 hover:bg-purple-50"
                                                    : "bg-gray-200 text-gray-400 border border-gray-300 cursor-not-allowed"
                                            }`}
                                        >
                                            ▶ Play
                                        </button>
                                    </div>
                                </div>
                            ))}

                            {/* ✅ 결과 확인 버튼 */}
                            <button
                                onClick={() => navigate("/test/result")}
                                className="w-full mt-6 py-3 text-black font-semibold text-lg rounded-full bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:opacity-90 transition"
                            >
                                결과 확인
                            </button>
                        </div>
                    </div>
                </div>



            </div>
        </div>
    );
}

export default Test;
