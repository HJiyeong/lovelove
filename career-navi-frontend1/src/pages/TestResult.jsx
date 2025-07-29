import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function TestResult() {
    const location = useLocation();
    const result = location.state?.result;

    if (!result) {
        return <div className="p-10 text-center text-red-500">결과를 불러올 수 없습니다.</div>;
    }

    return (
        <div className="flex min-h-screen font-sans">
            {/* 🌙 사이드바 */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#f1e0e2] to-[#ffeded] text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 pl-0">
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
                            <Link
                                key={idx}
                                to={["/", "/search", "/dictionary", "/calendar", "/settings", "/logout"][idx]}
                                className="rounded-xl px-4 py-2 text-left hover:bg-black/10 transition cursor-pointer flex items-center gap-3 font-medium text-black text-lg text-lg"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 🌞 메인 */}
            <div className="flex-1 relative bg-gradient-to-br from-purple-100 to-indigo-100 pt-24 px-6 pb-20">
                {/* 상단바 */}
                <header className="fixed top-0 left-64 right-0 h-20 px-8 bg-white/60 backdrop-blur-lg border-b border-white/20 shadow z-50 grid grid-cols-[auto_1fr_auto] items-center">
                    <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">검사 결과</h1>
                    <div className="justify-self-center">
                        <Link to="/" className="block">
                            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                                CareerNavi
                            </span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
                        <Link to="/test" className="text-gray-600 hover:text-purple-600">검사 선택</Link>
                        <Link to="/dictionary" className="text-gray-600 hover:text-purple-600">커리어 백과사전</Link>
                        <Link to="/chat" className="px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700">
                            💬 AI커비와 상담하기
                        </Link>
                    </nav>
                </header>

                {/* 본문 */}
                <div className="mt-20 flex flex-col items-center justify-center px-6">
                    <div className="bg-white rounded-xl shadow-xl p-10 w-full max-w-2xl text-center">
                        <h1 className="text-2xl font-bold mb-4">🎯 검사 결과</h1>
                        <p className="mb-6">아래 버튼을 눌러 커리어넷 공식 결과 페이지로 이동하세요.</p>
                        <a
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-purple-500 hover:bg-purple-600 text-black font-semibold px-6 py-3 rounded-xl transition"
                        >
                            🔗 결과 보기
                        </a>
                        <div className="mt-4">
                            <Link to="/test" className="text-sm text-blue-500 underline">
                                ← 검사 선택 화면으로 돌아가기
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TestResult;
