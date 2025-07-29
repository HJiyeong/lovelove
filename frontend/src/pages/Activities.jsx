import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";

function Activities() {
  const [activities, setActivities] = useState([
    { title: "AI 경진대회 참가", note: "AI 모델을 활용한 문제 해결 대회 참가" },
    { title: "캡스톤 디자인 프로젝트", note: "진로 탐색 웹앱 개발 프로젝트 진행" },
    { title: "프로그래밍 캠프 수료", note: "2주간 파이썬 집중 교육 이수" }
  ]);
  const [newActivity, setNewActivity] = useState("");
  const [newNote, setNewNote] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(null);
  const navigate = useNavigate();

  const handleAddActivity = () => {
    if (!newActivity.trim()) return;
    setActivities([...activities, { title: newActivity.trim(), note: newNote.trim() }]);
    setNewActivity("");
    setNewNote("");
    setSelectedIdx(activities.length);
  };

  const handleDelete = (idx) => {
    const updated = activities.filter((_, i) => i !== idx);
    setActivities(updated);
    setSelectedIdx(null);
  };

  return (
      <div className="flex min-h-screen font-sans">
        {/* 사이드바 */}
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
                      className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-white"
                  >
                    {label}
                  </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* 메인 콘텐츠 */}
        <div className="flex-1 relative bg-gradient-to-br from-indigo-50 to-purple-100 pt-24 px-6 pb-20">
          {/* 상단 고정 헤더 */}
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
              진로&nbsp;활동&nbsp;관리
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
        bg-purple-600 text-white
        shadow hover:bg-purple-700
        hover:-translate-y-0.5 active:translate-y-0
        transition transform whitespace-nowrap
      "
              >
                💬 AI큐비와&nbsp;상담하기
              </Link>
            </nav>
          </header>

          {/* 중앙 콘텐츠 */}
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-purple-700">📘 나의 진로 활동 기록</h1>
              <p className="text-gray-600 mt-2 text-sm">진로와 관련된 활동을 정리하고, 나만의 이력을 만들어보세요.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* 활동 추가 */}
              <div className="col-span-1 bg-white p-6 rounded-2xl shadow-md border border-gray-200">
                <h2 className="text-lg font-bold text-purple-700 mb-4">+ 새로운 활동 추가</h2>
                <input
                    type="text"
                    placeholder="활동 제목"
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <textarea
                    placeholder="활동 설명"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
                <button
                    onClick={handleAddActivity}
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                >
                  <Plus size={16} /> 추가하기
                </button>
              </div>

              {/* 활동 리스트 및 상세 */}
              <div className="col-span-2 space-y-4">
                {activities.map((activity, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedIdx(idx)}
                        className={`bg-white border hover:shadow-md transition p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                            selectedIdx === idx ? "ring-2 ring-purple-400" : "shadow-sm"
                        }`}
                    >
                      <div>
                        <div className="text-base font-semibold text-gray-800">{activity.title}</div>
                        <div className="text-sm text-gray-500 mt-1">{activity.note}</div>
                      </div>
                      <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(idx);
                          }}
                          className="text-red-400 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                ))}

                {/* 활동 상세 보기 */}
                {selectedIdx !== null && activities[selectedIdx] && (
                    <div className="mt-8 bg-purple-50 border border-[#fff3ed] rounded-xl p-6">
                      <h3 className="text-lg font-bold text-purple-700 mb-2">🔍 선택한 활동 상세</h3>
                      <p className="text-md font-semibold text-gray-800">{activities[selectedIdx].title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activities[selectedIdx].note || "설명이 없습니다."}</p>
                    </div>
                )}

                {/* 요약 */}
                <div className="mt-8 bg-white border border-gray-200 rounded-xl p-6">
                  <h4 className="text-md font-bold text-purple-700 mb-2">📊 활동 요약</h4>
                  <p className="text-sm text-gray-700">총 <strong>{activities.length}</strong>개의 활동을 기록했습니다.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}

export default Activities;
