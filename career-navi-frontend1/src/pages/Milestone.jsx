// pages/milestone.jsx
import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

function MilestonePage() {
    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split("T")[0]);
    const [todosByDate, setTodosByDate] = useState({
        "2025-05-27": [
            { id: 1, text: "독후감 작성", done: true, category: "독서", weight: 1 },
            { id: 2, text: "자기소개서 쓰기", done: false, category: "자기소개서", weight: 2 },
            { id: 3, text: "진로 백과사전 탐색", done: false, category: "탐색", weight: 1 },
            { id: 4, text: "대외활동 보고서 쓰기", done: true, category: "대외활동", weight: 3 },
            { id: 5, text: "캘린더 일정 등록", done: false, category: "기타", weight: 1 },
        ]
    });

    const todayTodos = todosByDate[selectedDate] || [];
    const [newTodo, setNewTodo] = useState("");
    const [newCategory, setNewCategory] = useState("기타");

    const updateTodos = (newTodos) => {
        setTodosByDate({ ...todosByDate, [selectedDate]: newTodos });
    };

    const handleToggle = (id) => {
        const updated = todayTodos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo);
        updateTodos(updated);
    };

    const handleAddTodo = () => {
        if (!newTodo.trim()) return;
        const id = todayTodos.length ? Math.max(...todayTodos.map((t) => t.id)) + 1 : 1;
        updateTodos([...todayTodos, { id, text: newTodo.trim(), done: false, category: newCategory, weight: 1 }]);
        setNewTodo("");
    };

    const totalWeight = todayTodos.reduce((sum, t) => sum + t.weight, 0);
    const earnedWeight = todayTodos.filter((t) => t.done).reduce((sum, t) => sum + t.weight, 0);
    const progressPercent = totalWeight ? Math.round((earnedWeight / totalWeight) * 100) : 0;

    const feedback = () => {
        const completedCategories = todayTodos.filter(t => t.done).map(t => t.category);
        if (completedCategories.includes("대외활동")) return "대외활동을 꾸준히 이어가고 있군요! 멋져요 ✨";
        if (completedCategories.includes("자기소개서")) return "자기소개서 작성에 집중하고 있어요. 실전 준비 중이네요! 💪";
        return "조금씩 진로 여정을 쌓아가고 있어요. 좋은 흐름입니다! 🚀";
    };

    const handleDateSelect = (info) => {
        const selected = info.startStr;
        setSelectedDate(selected);
        if (!todosByDate[selected]) {
            setTodosByDate(prev => ({ ...prev, [selected]: [] }));
        }
    };

    const categories = ["전체", ...new Set(todayTodos.map(t => t.category))];
    const [filter, setFilter] = useState("전체");
    const filteredTodos = filter === "전체" ? todayTodos : todayTodos.filter(t => t.category === filter);

    return (
        <div className="flex min-h-screen font-sans">
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {[
                            { label: "메인", path: "/" },
                            { label: "진로 검색", path: "/search" },
                            { label: "진로 백과사전", path: "/dictionary" },
                            { label: "진로 캘린더", path: "/calendar" },
                            { label: "마일스톤", path: "/milestone" },
                            { label: "설정", path: "/settings" },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(item.path)}
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            <main className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-100 pt-24 px-10 pb-40">
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
                        커리어&nbsp;마일스톤
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

                <div className="max-w-6xl mx-auto space-y-10">
                    <section className="bg-white border border-[#fff3ed] rounded-2xl shadow-xl p-6">
                        <h1 className="text-2xl font-bold text-purple-700 mb-2">🎯 오늘의 성취도</h1>
                        <p className="text-gray-600 text-sm mb-4">{feedback()}</p>
                        <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                            <div className="bg-purple-600 h-full text-xs text-black text-center transition-all duration-300" style={{ width: `${progressPercent}%` }}>{progressPercent}%</div>
                        </div>

                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-800">📋 {selectedDate}의 To-Do</h2>
                            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="border rounded px-2 py-1 text-sm">
                                {categories.map((c, i) => <option key={i} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <ul className="space-y-2 mb-4">
                            {filteredTodos.map((todo) => (
                                <li key={todo.id} className="flex items-center justify-between">
                                    <span className={`text-gray-800 ${todo.done ? 'line-through text-gray-400' : ''}`}>{todo.text} <span className="text-xs text-gray-400 ml-2">[{todo.category}]</span></span>
                                    <button onClick={() => handleToggle(todo.id)} className={`w-10 h-6 rounded-full transition-colors ${todo.done ? 'bg-green-500' : 'bg-gray-300'}`}>
                                        <span className={`block w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-200 ${todo.done ? 'translate-x-5' : 'translate-x-1'}`}></span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div className="flex gap-2">
                            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="할 일 입력..." className="flex-1 px-3 py-2 border rounded" />
                            <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border rounded px-2">
                                <option>자기소개서</option>
                                <option>대외활동</option>
                                <option>독서</option>
                                <option>탐색</option>
                                <option>기타</option>
                            </select>
                            <button onClick={handleAddTodo} className="bg-purple-600 text-black px-4 rounded">추가</button>
                        </div>

                        <div className="mt-10">
                            <h2 className="text-lg font-semibold text-gray-800 mb-2">📅 날짜별 To-Do 보기</h2>
                            <FullCalendar
                                plugins={[dayGridPlugin, interactionPlugin]}
                                initialView="dayGridMonth"
                                selectable={true}
                                select={handleDateSelect}
                                events={Object.keys(todosByDate).flatMap(date => todosByDate[date].length > 0 ? [{ title: `${todosByDate[date].filter(t => t.done).length}/${todosByDate[date].length} 완료`, date }] : [])}
                                height={500}
                                headerToolbar={{ start: "title", center: "", end: "today prev,next" }}
                            />
                            <div className="mt-10 text-center">
                                <p className="text-sm text-gray-600 mb-3">AI 커비가 추천하는 김교육님만을 위한</p>
                                <button
                                    onClick={() => navigate("/job-links")}
                                    className="inline-block px-6 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700 transition shadow"
                                >
                                    🔍 전체 로드맵 보기
                                </button>
                            </div>

                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}

export default MilestonePage;
