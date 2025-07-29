import React from "react";

function Diagnosis() {
  const results = [
    {
      title: "2025 진로 적성 검사",
      summary: "분석 결과, 창의성과 논리적 사고가 높은 편이며 기술 분야에 적합합니다.",
      details: [
        "🧠 사고 유형: 분석적 사고 > 직관적 사고",
        "🎯 적합 분야: 소프트웨어 개발, UX 기획",
        "💡 추천 활동: 프로젝트 기반 학습, 문제 해결 중심 과제"
      ]
    },
    {
      title: "AI 분야 직무 추천 결과",
      summary: "기계학습과 데이터 분석 능력을 바탕으로 AI 응용 개발에 적합합니다.",
      details: [
        "📌 추천 직무: AI 엔지니어, 데이터 분석가",
        "📚 요구 역량: Python, 머신러닝 프레임워크, 통계학",
        "🏫 연계 전공: 인공지능학과, 통계학과"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-col items-center py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold text-purple-700 mb-10">직무진단서</h1>

      <div className="w-full max-w-3xl space-y-10">
        {results.map((item, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h2>
            <p className="text-gray-600 mb-4">{item.summary}</p>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {item.details.map((detail, i) => (
                <li key={i}>{detail}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Diagnosis;
