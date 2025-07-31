import React, { useEffect, useState } from "react";

const recommendedData = [
  {
    type: "썸 조언",
    title: "밀당은 과학이다",
    description: "답장 늦게 오는 건 바빠서가 아니라 \n너한테 설렘이 덜해서야. 인정?",
    image: "/img_love1.png",
  },
  {
    type: "연애 조언",
    title: "사랑은 타이밍",
    description: "자꾸 타이밍 탓하지 마. \n 넌 매번 안 던졌잖아. 고백을.",
    image: "/img_love2.png",
  },
  {
    type: "이별 조언",
    title: "잡은 물고기엔 미끼 안 준다",
    description: "연애가 편해졌다고 관심까지 놓으면, \n 그 물고기 도망간다. 진심으로.",
    image: "/img_love3.png",
  },
  {
    type: "썸 조언",
    title: "눈치 챙겨",
    description: "걔가 웃는다고 너 좋아하는 거 아냐. \n서비스일 수도 있지.",
    image: "/img_love4.png",
  },
  {
    type: "연애 조언",
    title: "고민은 배송을 늦출 뿐",
    description: "‘보낼까 말까’ 고민하는 사이에 \n걘 다른 사람한테 웃고 있어.",
    image: "/img_love5.png",
  },
];

function RecommendedSlide() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % recommendedData.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = recommendedData[index];

  return (
    <div className="w-80 bg-white rounded-xl shadow-xl p-5 border border-pink-200 transition-all duration-500">
      <div className="flex items-center mb-2">
      
        <div>
          <p className="text-base text-gray-400">{current.type}</p>
          <h3 className="text-xl font-bold text-pink-700">{current.title}</h3>
        </div>
      </div>

      {/* 킹받는 한마디 */}
      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold text-pink-600">큐피봇</span>의 도발 한마디!
      </p>

      <p className="text-lg text-gray-500 mb-3">
        {current.description.split("\n").map((line, i) => (
            <span key={i}>
            {line}
            <br />
            </span>
        ))}
        </p>

      <div className="mt-3 flex justify-center gap-2">
        {recommendedData.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-pink-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedSlide;
