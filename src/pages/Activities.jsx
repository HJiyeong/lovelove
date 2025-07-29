import React, { useState } from "react";

function Activities() {
  const [activities, setActivities] = useState([
    { title: "AI 경진대회 참가", note: "AI 모델을 활용한 문제 해결 대회 참가" },
    { title: "캡스톤 디자인 프로젝트", note: "진로 탐색 웹앱 개발 프로젝트 진행" },
    { title: "프로그래밍 캠프 수료", note: "2주간 파이썬 집중 교육 이수" }
  ]);

  const [newActivity, setNewActivity] = useState("");
  const [newNote, setNewNote] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(null);

  const handleAddActivity = () => {
    if (newActivity.trim()) {
      setActivities([...activities, { title: newActivity.trim(), note: newNote.trim() }]);
      setNewActivity("");
      setNewNote("");
    }
  };

  const handleDelete = (idx) => {
    const updated = activities.filter((_, i) => i !== idx);
    setActivities(updated);
    if (selectedIdx === idx) setSelectedIdx(null);
  };

  const handleEdit = (idx, newTitle, newNote) => {
    const updated = [...activities];
    updated[idx] = { title: newTitle, note: newNote };
    setActivities(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-6 py-10 font-sans flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">진로 활동</h1>

      {/* 활동 추가 입력 */}
      <div className="mb-10 w-full max-w-2xl grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            placeholder="활동 제목"
            value={newActivity}
            onChange={(e) => setNewActivity(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <textarea
            placeholder="활동 설명"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full px-4 py-2 mt-2 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={handleAddActivity}
            className="mt-3 w-full bg-purple-600 text-black py-2 rounded-xl hover:bg-purple-700 transition"
          >
            추가하기
          </button>
        </div>

        {/* 상세 보기 */}
        <div className="bg-white p-4 rounded-xl shadow-md min-h-[160px]">
          <h2 className="text-lg font-bold text-purple-700 mb-2">활동 상세</h2>
          {selectedIdx !== null ? (
            <>
              <p className="font-semibold">{activities[selectedIdx].title}</p>
              <p className="text-sm text-gray-600 mt-1">{activities[selectedIdx].note || "설명이 없습니다."}</p>
            </>
          ) : (
            <p className="text-sm text-gray-400">항목을 클릭해보세요.</p>
          )}
        </div>
      </div>

      {/* 활동 리스트 */}
      <div className="w-full max-w-2xl space-y-4 mb-8">
        {activities.map((activity, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl py-4 px-6 flex justify-between items-center hover:bg-purple-50 cursor-pointer"
            onClick={() => setSelectedIdx(idx)}
          >
            <div>
              <div className="font-medium text-gray-700">{activity.title}</div>
              <div className="text-xs text-gray-400">{activity.note.slice(0, 30)}...</div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-sm text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(idx);
                }}
              >
                삭제
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 활동 요약 */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-6 mt-6">
        <h2 className="text-lg font-bold text-purple-700 mb-3">📌 활동 요약</h2>
        <p className="text-gray-700 text-sm">총 {activities.length}개의 활동을 기록했습니다.</p>
      </div>
    </div>
  );
}

export default Activities;
