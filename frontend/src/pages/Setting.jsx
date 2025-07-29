// src/pages/Setting.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Setting() {
    const [notifications, setNotifications] = useState({
        email: true,
        sms: false,
        push: true,
    });
    const [darkMode, setDarkMode] = useState(false);
    const [fontSize, setFontSize] = useState("medium");
    const [name, setName] = useState("김교육");
    const [email, setEmail] = useState("k-education@mail.com");
    const [password, setPassword] = useState("");

    return (
        <div className="flex min-h-screen font-sans">
            {/* 사이드바 */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 pl-0">
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {["메인", "전공 검색", "진로 백과사전", "진로 캘린더", "설정", "로그아웃"].map((label, idx) => (
                            <Link
                                key={idx}
                                to={["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx]}
                                className="rounded-xl px-4 py-2 text-left hover:bg-black/10 transition cursor-pointer flex items-center gap-3 font-medium text-black text-lg"
                            >
                                {label}
                            </Link>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 본문 */}
            <div className="flex-1 relative bg-gradient-to-br from-indigo-50 to-purple-100 pt-24 px-6 pb-20">
                {/* 상단바 */}
                <header className="fixed top-0 left-64 right-0 h-20 px-8 bg-white/60 backdrop-blur-lg border-b border-white/20 shadow z-50 grid grid-cols-[auto_1fr_auto] items-center">
                    <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">설정</h1>
                    <div className="justify-self-center">
                        <Link to="/" className="block">
              <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
                CareerNavi
              </span>
                        </Link>
                    </div>
                    <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
                        <Link to="/test" className="text-gray-600 hover:text-purple-600">적성검사</Link>
                        <Link to="/dateplace" className="text-gray-600 hover:text-purple-600">커리어 백과사전</Link>
                        <Link to="/milestone" className="text-gray-600 hover:text-purple-600">마일스톤</Link>
                        <Link to="/chat" className="px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700">
                            💬 AI커비와 상담하기
                        </Link>
                    </nav>
                </header>

                {/* 내용 */}
                <div className="max-w-4xl mx-auto bg-white border border-[#fff3ed] rounded-3xl shadow p-10 space-y-10">

                    {/* 🔐 개인정보 수정 */}
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">🔐 개인정보 수정</h2>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700">이름</label>
                            <input value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />

                            <label className="block text-sm font-medium text-gray-700">이메일</label>
                            <input value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />

                            <label className="block text-sm font-medium text-gray-700">비밀번호 변경</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />

                            <button className="mt-4 px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700 text-sm">
                                저장하기
                            </button>
                        </div>
                    </section>

                    {/* 📬 알림 설정 */}
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">📬 알림 설정</h2>
                        {[
                            ["이메일 알림", "email"],
                            ["SMS 알림", "sms"],
                            ["앱 푸시 알림", "push"],
                        ].map(([label, key]) => (
                            <div key={key} className="flex justify-between items-center py-1">
                                <span className="text-gray-700 font-medium">{label}</span>
                                <button
                                    onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                                    className={`w-12 h-6 rounded-full px-1 flex items-center ${
                                        notifications[key] ? "bg-purple-600" : "bg-gray-300"
                                    }`}
                                >
                                    <div
                                        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                                            notifications[key] ? "translate-x-6" : ""
                                        }`}
                                    />
                                </button>
                            </div>
                        ))}
                    </section>

                    {/* 🎨 테마 설정 */}
                    <section>
                        <h2 className="text-xl font-bold text-purple-700 mb-4">🎨 화면 설정</h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700 font-medium">다크 모드</span>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className={`w-12 h-6 rounded-full px-1 flex items-center ${
                                        darkMode ? "bg-purple-600" : "bg-gray-300"
                                    }`}
                                >
                                    <div
                                        className={`w-4 h-4 bg-white rounded-full shadow transform transition ${
                                            darkMode ? "translate-x-6" : ""
                                        }`}
                                    />
                                </button>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">폰트 크기</label>
                                <select
                                    value={fontSize}
                                    onChange={e => setFontSize(e.target.value)}
                                    className="w-full px-3 py-2 border rounded-lg"
                                >
                                    <option value="small">작게</option>
                                    <option value="medium">보통</option>
                                    <option value="large">크게</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* ⚠️ 계정 관리 */}
                    <section>
                        <h2 className="text-xl font-bold text-red-600 mb-4">⚠️ 계정 관리</h2>
                        <div className="space-y-3">
                            <button className="w-full px-4 py-2 rounded-xl bg-gray-100 text-sm hover:bg-gray-200">
                                로그아웃
                            </button>
                            <button className="w-full px-4 py-2 rounded-xl bg-yellow-100 text-sm hover:bg-yellow-200">
                                계정 일시 비활성화
                            </button>
                            <button className="w-full px-4 py-2 rounded-xl bg-red-500 text-black text-sm hover:bg-red-600">
                                계정 영구 삭제
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
