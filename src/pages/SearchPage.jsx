import React, { useState } from "react";

// (나중에 DB로 대체할 예정) 임시 데이터
const majorsData = [
  { major: "컴퓨터공학과", universities: ["서울대", "KAIST", "DGIST"], intake: "80명" },
  { major: "심리학과", universities: ["연세대", "고려대", "성균관대"], intake: "50명" },
  { major: "경영학과", universities: ["고려대", "서강대", "한양대"], intake: "100명" },
  { major: "간호학과", universities: ["서울대", "연세대"], intake: "60명" },
];

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMajors = majorsData.filter((item) =>
    item.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-6 py-10 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* 타이틀 */}
        <h1 className="text-3xl font-bold text-purple-700 mb-6">🎓 대학 전공 정보 검색</h1>
        <p className="text-gray-600 mb-10">관심 있는 전공명이나 관련 대학을 검색해보세요.</p>

        {/* 검색창 */}
        <div className="flex items-center gap-4 mb-12">
          <input
            type="text"
            placeholder="전공명 입력 (예: 컴퓨터공학과)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 p-3 rounded-xl shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button className="bg-purple-600 text-black px-6 py-2 rounded-xl shadow hover:bg-purple-700 transition">
            검색
          </button>
        </div>

        {/* 결과 리스트 */}
        <div className="bg-white shadow-md rounded-xl p-6 space-y-6">
          {filteredMajors.length > 0 ? (
            filteredMajors.map((item, idx) => (
              <div key={idx} className="border-b pb-4 last:border-b-0">
                <h2 className="text-xl font-bold text-purple-700">{item.major}</h2>
                <div className="text-sm text-gray-700 mt-2">
                  <p><strong>개설 대학:</strong> {item.universities.join(", ")}</p>
                  <p><strong>입학 정원:</strong> {item.intake}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
