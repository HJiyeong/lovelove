import React from "react";

function Milestone() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 to-cyan-100 flex flex-col items-center py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">커리어 마일스톤</h1>

      {/* 각 마일스톤 블록 */}
      <div className="w-full max-w-md space-y-6">
        {[
          { label: "학업 성취도", value: 80 },
          { label: "자기소개서", value: 60 },
          { label: "진로 활동", value: 50 },
          { label: "포트폴리오", value: 30 },
        ].map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold text-gray-700">{item.label}</span>
              <span className="text-sm text-gray-500">{item.value}%</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                style={{ width: `${item.value}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 네비게이션 바 */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 flex justify-around items-center h-14 shadow-inner mt-10">
        <button className="text-purple-600 text-xl">🏠</button>
        <button className="text-purple-600 text-xl">📊</button>
        <button className="text-purple-600 text-xl">💬</button>
        <button className="text-purple-600 text-xl">⚙️</button>
      </div>
    </div>
  );
}

export default Milestone;
