import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { FileText } from "lucide-react";

function ResumeTestDashboard() {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);

    const fetchResumes = async () => {
        try {
            const res = await axios.get("/api/resume/all");
            setDocuments(res.data || []);
        } catch (err) {
            console.error("자소서 목록 불러오기 실패 ❌", err);
        }
    };

    useEffect(() => {
        fetchResumes();
    }, []);

    return (
        <div className="flex min-h-screen font-sans">
            {/* ✅ Sidebar */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
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

            {/* ✅ Main Content */}
            <div className="flex-1 relative bg-gradient-to-br from-purple-50 to-blue-50 pt-24 px-10 pb-20">
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
                        자기소개서&nbsp;분석
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


                <div className="max-w-5xl mx-auto space-y-10">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-extrabold text-gray-800 leading-snug">📄 자기소개서 분석</h1>
                            <p className="text-gray-600 text-sm">자소서를 저장하고, AI 분석을 받아보세요.</p>
                        </div>
                        <button
                            onClick={() => navigate(`/test/resume/editor`)}
                            className="bg-gradient-to-br from-purple-500 to-indigo-500 hover:opacity-90 text-black px-5 py-2 rounded-xl font-bold shadow-lg transition duration-300"
                        >
                            + 새 문서 작성
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {documents.length === 0 ? (
                            // ✅ 아무 자소서가 없을 때만 보여줌
                            <div className="col-span-2 flex flex-col items-center justify-center border border-dashed border-purple-300 rounded-2xl p-10 bg-purple-50 shadow-sm">
                                <p className="text-lg font-semibold text-purple-700 mb-2">아직 작성된 자기소개서가 없어요.</p>
                                <p className="text-sm text-gray-600 mb-4">상단의 <strong>‘+ 새 문서 작성’</strong> 버튼을 눌러 새로운 자소서를 시작해보세요.</p>
                                <div className="bg-gradient-to-r from-purple-300 to-indigo-300 text-black font-semibold px-4 py-2 rounded-full shadow-md opacity-50 cursor-not-allowed">
                                    ✍️ 새 자기소개서 작성
                                </div>
                            </div>
                        ) : (
                            // ✅ 자소서가 하나라도 있으면 안내 박스 없이 자소서 카드만 보여줌
                            documents.map((doc) => (
                                <div
                                    key={doc.id}
                                    onClick={() => navigate(`/test/resume/editor?id=${doc.id}`)}
                                    className="relative bg-white hover:bg-gradient-to-r from-white to-purple-50 border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition duration-300 group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-3">
                                        <FileText className="text-purple-500 group-hover:scale-110 transition" />
                                        <h2 className="text-xl font-semibold text-gray-800 group-hover:text-purple-700">
                                            {doc.title || `제목 없음`}
                                        </h2>
                                    </div>
                                    <p className="text-sm text-gray-600 mb-4">
                                        {doc.text?.slice(0, 30) || "내용 미작성..."}
                                    </p>
                                    <div className="absolute bottom-4 right-6 text-sm text-purple-600 font-medium">
                                        📊 점수: <span className="font-bold">85</span> / 100
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}

export default ResumeTestDashboard;
