import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../data/testQuestions";

const initialScores = {
  LS: 0,
  EM: 0,
  DL: 0,
  DP: 0,
  PI: 0,
};

const determineType = (scores) => {
  const { LS, EM, DL, DP, PI } = scores;
  const axis = {
    LS: LS >= 16 ? "H" : "L",
    EM: EM >= 16 ? "H" : "L",
    DL: DL >= 16 ? "H" : "L",
    DP: DP >= 16 ? "H" : "L",
    PI: PI >= 16 ? "H" : "L",
  };
  if (axis.LS === "H" && axis.EM === "H" && axis.DL === "L") return "A3";
  if (axis.LS === "L" && axis.EM === "H" && axis.DL === "L") return "A2";
  if (axis.LS === "H" && axis.EM === "L" && axis.DL === "H") return "A1";
  if (axis.LS === "L" && axis.EM === "L" && axis.DL === "H") return "A4";
  if (axis.DL === "H" && axis.DP === "H") return "B1";
  if (axis.DL === "L" && axis.DP === "L") return "B2";
  if (axis.EM === "H" && axis.PI === "H") return "B3";
  if (axis.EM === "H" && axis.PI === "L") return "B4";
  if (axis.EM === "L" && axis.PI === "L") return "C1";
  if (axis.DP === "H" && axis.LS === "L") return "C2";
  if (axis.PI === "H" && axis.LS === "H") return "C3";
  return "C4";
};

const TestPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scores, setScores] = useState(initialScores);
  const navigate = useNavigate();

  const handleAnswer = (value) => {
    const dim = questions[currentIndex].dimension;
    setScores((prev) => ({
      ...prev,
      [dim]: prev[dim] + value,
    }));
    setCurrentIndex((prev) => prev + 1);
  };

  useEffect(() => {
    if (currentIndex === questions.length) {
      const type = determineType(scores);
      console.log("✅ 최종 성향:", type);
      navigate(`/test-result?type=${type}`);
    }
  }, [currentIndex]); // currentIndex가 마지막일 때 실행됨

  const currentQ = questions[currentIndex];

  if (!currentQ) return null;

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#feeaff] via-[#ebd0f2] to-[#d4c1f4] flex items-center justify-center px-4 py-10">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-xl text-center">
        <h2 className="text-2xl font-bold text-[#8b495a] mb-6">{`Q${currentIndex + 1}. ${currentQ.question}`}</h2>
        <div className="flex flex-col space-y-4 items-center">
          {currentQ.options.map((opt, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(opt.value)}
              className="w-full max-w-md bg-white border border-[#d4c1f4] hover:bg-[#feeaff] rounded-xl px-4 py-3 shadow-md text-left"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestPage;
