import React, { useState } from "react";

function Test() {
  const questions = [
    { question: "새로운 기술을 배우는 것을 즐깁니까?", options: ["예", "아니오"] },
    { question: "혼자서 프로젝트를 수행하는 걸 선호합니까?", options: ["예", "아니오"] },
    { question: "팀워크 활동을 좋아합니까?", options: ["예", "아니오"] },
    { question: "문제를 논리적으로 분석하는 것을 좋아합니까?", options: ["예", "아니오"] },
    { question: "창의적인 아이디어를 떠올리는 것을 즐깁니까?", options: ["예", "아니오"] },
    { question: "데이터를 기반으로 결정을 내리는 것을 선호합니까?", options: ["예", "아니오"] },
    { question: "새로운 사람들과 소통하는 것을 좋아합니까?", options: ["예", "아니오"] },
    { question: "리더십을 발휘하는 것을 즐깁니까?", options: ["예", "아니오"] },
    { question: "디자인이나 미적인 것에 관심이 많습니까?", options: ["예", "아니오"] },
    { question: "긴 시간 집중하여 일하는 데 거부감이 없습니까?", options: ["예", "아니오"] },
  ];

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState([]);

  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert("검사가 완료되었습니다! 결과 페이지로 이동합니다.");
      // 여기서 결과 페이지 이동 코드 추가 가능
    }
  };

  const progress = Math.round(((current + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-6 py-10 font-sans flex flex-col items-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow p-8 text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-purple-700 mb-2">AI 기반 진로 적성 검사</h1>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-purple-500 h-3 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">{progress}% 진행</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-800 mb-4">{questions[current].question}</h2>
          <div className="flex justify-center gap-6">
            {questions[current].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                className="bg-purple-600 hover:bg-purple-700 text-black px-6 py-3 rounded-xl transition text-lg"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Test;
