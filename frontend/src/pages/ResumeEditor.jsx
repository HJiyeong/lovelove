import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ... 생략 import
function ResumeEditor() {
    const navigate = useNavigate();
    const [text, setText] = useState("");
    const [title, setTitle] = useState("새 자기소개서");
    const [analysis, setAnalysis] = useState([]);
    const [rewritten, setRewritten] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [loadingRewrite, setLoadingRewrite] = useState(false);

    const handleAnalyze = async () => {
        setLoadingAnalysis(true);
        try {
            const res = await axios.post("/api/resume/analyze", { text });
            setAnalysis(res.data.analysis.split('\n').filter(line => line.trim()));
        } catch (err) {
            console.error("분석 실패 ❌", err);
        } finally {
            setLoadingAnalysis(false);
        }
    };

    const handleRewrite = async () => {
        setLoadingRewrite(true);
        try {
            const res = await axios.post("/api/resume/rewrite", { title, text });
            setRewritten(res.data);
            setShowModal(true);
        } catch (err) {
            console.error("첨삭 실패 ❌", err);
        } finally {
            setLoadingRewrite(false);
        }
    };

    useEffect(() => {
        const id = new URLSearchParams(window.location.search).get("id");
        if (id) {
            axios.get(`/api/resume/${id}`).then(res => {
                setText(res.data.text);
                setTitle(res.data.title);
                setAnalysis(res.data.analysis?.split?.('\n') || []);
            });
        }
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (text.trim()) {
                axios.post("/api/resume/save", { title, text });
            }
        }, 10000000);
        return () => clearTimeout(timer);
    }, [text, title]);

    return (
        <div className="flex min-h-screen font-sans">
            {/* ✅ 복원된 사이드바 */}
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
                                    navigate(["/", "/search", "/dictionary", "/calendar", "/settings", "/logout"][idx])
                                }
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 본문 */}
            <div className="flex-1 relative bg-gradient-to-br from-purple-50 to-indigo-100 pt-24 px-10 pb-20">
                <header className="fixed top-0 left-64 right-0 h-16 bg-white/60 backdrop-blur-md border-b border-white/30 shadow-sm flex items-center justify-between px-6 z-40 rounded-bl-2xl">
                    <h2 className="text-xl font-bold text-purple-700 tracking-tight">자기소개서 작성</h2>

                    <div className="flex gap-4 items-center">
                        {/* 대시보드로 돌아가기 */}
                        <button
                            onClick={() => navigate("/test/resume")}
                            className="text-sm text-purple-600 hover:underline flex items-center"
                        >
                            ← 대시보드로
                        </button>

                        {/* 저장하기 수동 트리거 */}
                        <button
                            onClick={() => {
                                axios.post("/api/resume/save", { title, text });
                                alert("저장되었습니다!");
                            }}
                            className="bg-purple-600 hover:bg-purple-700 text-black text-sm px-4 py-1.5 rounded-full shadow-sm transition"
                        >
                            💾 저장하기
                        </button>
                    </div>
                </header>


                <div className="flex gap-6">
                    {/* 입력 */}
                    <div className="w-2/3 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                        {/* 제목/내용 */}
                        <div className="mb-4">
                            <label className="text-purple-700 font-bold text-sm mb-2 block">📌 제목</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
                            />
                        </div>
                        <h2 className="text-xl font-bold mb-4 text-purple-700">✍️ 자기소개서 입력</h2>
                        <textarea
                            className="w-full h-[60vh] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-300 resize-none text-sm leading-relaxed"
                            placeholder="여기에 자기소개서를 입력하거나 붙여넣으세요..."
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <button
                            onClick={handleAnalyze}
                            className="mt-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 text-black px-6 py-2 rounded-full font-semibold transition"
                        >
                            분석하기
                        </button>
                    </div>

                    {/* 분석 결과 */}
                    <div className="w-1/3 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6">📊 분석 결과</h3>

                        <button
                            onClick={handleRewrite}
                            className="mb-6 w-full bg-gradient-to-r from-purple-700 to-indigo-600 text-black px-4 py-2 rounded-full font-semibold shadow hover:opacity-90 transition"
                        >
                            ✍️ 보완된 자기소개서 보기
                        </button>

                        {loadingAnalysis ? (
                            <div className="text-center text-gray-700 text-lg animate-pulse py-20">
                                🤖 <span className="font-semibold text-purple-600">AI 커비</span>가 김교육님의 자기소개서를 열심히 분석 중이에요...<br />
                                <span className="text-sm text-gray-500">(약 10초 정도 소요됩니다)</span>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <h4 className="font-semibold text-purple-700 text-base mb-2">자기소개서 분석 보고서</h4>
                                {analysis.map((line, idx) => (
                                    <div key={idx} className="border-l-4 border-purple-400 bg-purple-50 px-4 py-3 rounded-xl shadow-sm">
                                        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">
                                            <span className="font-bold text-purple-700 mr-1">{idx + 1}.</span> {line}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 모달 */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-[90%] max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* 모달 상단 */}
                        <div className="flex justify-between items-center p-4 border-b">
                            <h3 className="text-lg font-bold text-purple-700">✍️ 보완된 자기소개서</h3>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                            >
                                ✖
                            </button>
                        </div>

                        {/* 모달 본문 */}
                        <div className="p-6 overflow-y-auto">
                            {loadingRewrite ? (
                                <div className="border bg-purple-50 rounded-xl py-10 px-4 text-center text-gray-700 animate-pulse shadow-inner">
                                    🤖 <span className="font-semibold text-purple-600">AI 커비</span>가 보완된 자기소개서를 작성 중이에요...<br />
                                    <span className="text-sm text-gray-500">(10초 정도 소요됩니다)</span>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-800 whitespace-pre-line leading-relaxed">
                                    {rewritten}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default ResumeEditor;

