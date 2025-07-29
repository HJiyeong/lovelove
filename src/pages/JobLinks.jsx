import React from "react";

function JobLinks() {
  const jobs = [
    "프론트엔드 개발자",
    "데이터 분석가",
    "AI 연구원"
  ];

  const jobDescriptions = {
    "프론트엔드 개발자": [
      "💻 웹 UI 구현 및 사용자 경험 설계",
      "🛠️ HTML, CSS, JavaScript, React 등 사용",
      "📱 반응형 디자인, 접근성 고려 필수"
    ],
    "데이터 분석가": [
      "📊 데이터 수집 및 정제, 시각화",
      "📈 통계 기반 인사이트 도출 및 보고서 작성",
      "📚 Python, SQL, Excel, Tableau 등 도구 사용"
    ],
    "AI 연구원": [
      "🧠 머신러닝/딥러닝 알고리즘 연구",
      "🧪 모델 학습, 평가, 최적화 실험 반복",
      "📂 논문 분석, 프레임워크 활용 능력 요구"
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-100 flex flex-col items-center py-10 px-4 font-sans">
      <h1 className="text-3xl font-bold text-purple-700 mb-8">연결된 직무</h1>

      {/* 상단 직무 리스트 */}
      <div className="w-full max-w-md space-y-4 mb-10">
        {jobs.map((job, idx) => (
          <div
            key={idx}
            className="bg-white shadow-md rounded-xl py-4 px-6 text-center font-medium text-gray-700"
          >
            {job}
          </div>
        ))}
      </div>

      {/* 하단 설명 카드 */}
      <div className="w-full max-w-3xl space-y-8">
        {jobs.map((job, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold text-purple-700 mb-3">{job}</h2>
            <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
              {jobDescriptions[job].map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobLinks;
