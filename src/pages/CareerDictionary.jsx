import React, { useState } from "react";

function CareerDictionary() {
  const careers = [
    { job: "프론트엔드 개발자", major: "컴퓨터공학과" },
    { job: "AI 연구원", major: "인공지능학과" },
    { job: "데이터 분석가", major: "통계학과" },
    { job: "간호사", major: "간호학과" },
    { job: "심리상담사", major: "심리학과" },
    { job: "경영 컨설턴트", major: "경영학과" },
    { job: "로봇 엔지니어", major: "로봇공학과" },
    { job: "게임 기획자", major: "게임공학과" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCareers = careers.filter((career) =>
    career.job.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-50 to-purple-100 flex flex-col items-center py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">커리어 백과사전 📚</h1>

      {/* 검색창 */}
      <div className="w-full max-w-2xl mb-8">
        <input
          type="text"
          placeholder="직업명을 입력하세요 (예: 개발자)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-4 rounded-xl border border-gray-300 shadow focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* 결과 리스트 */}
      <div className="w-full max-w-2xl space-y-6">
        {filteredCareers.length > 0 ? (
          filteredCareers.map((item, idx) => (
            <div key={idx} className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-lg font-bold text-gray-800">{item.job}</h2>
              <p className="text-sm text-gray-600 mt-2">관련 전공: {item.major}</p>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">검색 결과가 없습니다.</div>
        )}
      </div>
    </div>
  );
}

export default CareerDictionary;

