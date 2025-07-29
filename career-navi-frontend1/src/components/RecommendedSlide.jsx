import React, { useEffect, useState } from "react";

const recommendedData = [
    {
        type: "직무 추천",
        title: "데이터 사이언티스트",
        description: "데이터를 분석해 의미 있는 인사이트를 찾고, 기업의 의사결정을 돕는 전문가예요!",
        image: "/data.png"
    },
    {
        type: "학과 추천",
        title: "컴퓨터과학과",
        description: "코딩, 알고리즘, 인공지능까지! 디지털 세상의 중심을 배우는 학과예요.",
        image: "/computer.png"
    },
    {
        type: "직무 추천",
        title: "시스템엔지니어",
        description: "IT 시스템이 문제없이 돌아가도록 설계하고 관리하는 숨은 핵심 역할이에요!",
        image: "/system.png"
    }
];

function RecommendedSlide() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % recommendedData.length);
        }, 2000);
        return () => clearInterval(timer);
    }, []);

    const current = recommendedData[index];

    return (
        <div className="w-80 bg-white rounded-xl shadow-xl p-5 border border-purple-100 transition-all duration-500">
            <div className="flex items-center mb-2">
                <img src="/img_1.png" alt="Curby" className="w-10 h-10 mr-2" />
                <div>
                    <p className="text-xs text-gray-400">{current.type}</p>
                    <h3 className="text-md font-bold text-purple-700">{current.title}</h3>
                </div>
            </div>

            {/* 사용자 하드코딩 멘트 */}
            <p className="text-sm text-gray-600 mb-1">
                <span className="font-semibold text-purple-700">김교육</span>님께 추천드리는 {current.type === "학과 추천" ? "학과" : "직무"}예요!
            </p>

            {/* 설명 */}
            <p className="text-sm text-gray-500 mb-3">{current.description}</p>

            {/* 이미지 */}
            <img
                src={current.image}
                alt={current.title}
                className="w-full h-32 object-contain rounded-md"
            />

            {/* 인디케이터 */}
            <div className="mt-3 flex justify-center gap-2">
                {recommendedData.map((_, i) => (
                    <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${i === index ? 'bg-purple-600' : 'bg-gray-300'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default RecommendedSlide;
