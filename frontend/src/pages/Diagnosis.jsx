import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

function Diagnosis() {
    const [report, setReport] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const generateReport = async () => {
            try {
                const [res1, res2] = await Promise.all([
                    axios.get("/data/result.json"),
                    axios.get("/data/favorite_job.json"),
                ]);

                const personality = res1.data;
                const favorites = res2.data;

                const response = await axios.post(
                    "/api/report/generate",
                    {
                        typeName: personality.typeName,
                        keywords: personality.keywords,
                        description: personality.description,
                        favoriteJobs: favorites,
                    },
                    {
                        headers: { "Content-Type": "application/json" },
                        responseType: "text",
                    }
                );

                setReport(response.data);
            } catch (err) {
                console.error("❌ GPT 호출 실패:", err);
                setReport("<p style='color:red;'>GPT 호출 중 오류가 발생했습니다.</p>");
            } finally {
                setLoading(false);
            }
        };

        generateReport();
    }, []);

    return (
        <div className="flex min-h-screen font-sans">
            {/* 🟣 사이드바 */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#f1e0e2] to-[#ffeded] text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xltify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div
                        className="p-3 mb-10 flex items-start justify-start pl-0 cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
                            <button
                                key={idx}
                                onClick={() =>
                                    navigate(["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx])
                                }
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 🎯 메인 콘텐츠 */}
            <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-purple-100 pt-24 px-6 pb-20">
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
                    <h1 className="text-xl font-bold text-purple-600 whitespace-nowrap">
                        AI&nbsp;진단&nbsp;결과&nbsp;리포트
                    </h1>

                    <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
                        {[
                            ["적성검사", "/test"],
                            ["커리어&nbsp;백과사전", "/dateplace"],
                            ["마일스톤", "/milestone"],
                        ].map(([label, path]) => (
                            <Link
                                key={label}
                                to={path}
                                className="relative text-gray-600 hover:text-purple-600 transition group"
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
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
                            💬 AI커비와&nbsp;상담하기
                        </Link>
                    </nav>
                </header>


                {/* 💡 진단 리포트 카드 */}
                <div className="relative max-w-3xl mx-auto mt-10">
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-20">
                        <img
                            src="/pin.png"
                            alt="Pin"
                            className="w-[40px] h-[40px] drop-shadow-lg"
                        />
                    </div>

                    <div className="relative bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-[#fff3ed] pt-10 p-6 z-10">
                        <h2 className="text-2xl font-bold text-center mb-4">
                            김교육님의 진로심리검사 결과 분석 및 컨설팅 보고서
                        </h2>

                        {loading ? (
                            <div className="text-center text-gray-700 text-lg animate-pulse py-20">
                                🤖 <span className="font-semibold text-purple-600">AI 커비</span>가 김교육님의 커리어를 열심히 분석 중이에요...<br />
                                <span className="text-sm text-gray-500">(약 20초 정도 소요됩니다)</span>
                            </div>

                        ) : (
                            <div
                                className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: report }}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Diagnosis;
