import React, { useEffect, useState } from "react";

const quotes = [
    {
        author: "알버트 아인슈타인",
        content: "만유인력은 사랑에 빠진 사람을 책임지지 않는다."
    },
    {
        author: "알프레드 테니슨",
        content: "사랑해서 사랑을 잃은 것은 전혀 사랑하지 않는 것보다 낫다."
    },
    {
        author: "서머셋",
        content: "중요한 것은 사랑을 받는 것이 아니라 사랑을 하는 것이다."
    },
    {
        author: "헨리 데이빗 소로우",
        content: "사랑에 의한 상처는 더 많이 사랑함으로써 치유된다."
    },
    {
        author: "벤저민 프랭클린",
        content: "사랑받고 싶다면 사랑하라. 그리고 사랑스럽게 행동하라."
    },
    {
        author: "괴테",
        content: "아무리 큰 공간일지라도 설사 그것이 하늘과 땅 사이라 할지라도 사랑의 힘으로 메꿀 수 있다."
    },
    {
        author: "카렌 선드",
        content: "사랑하는 것은 천국을 살짝 엿보는 것이다."
    },
    {
        author: "세르반테스",
        content: "사랑을 품을 때 삶은 진정한 의미를 되찾는다."
    }
];

function RecommendedSlide() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % quotes.length);
        }, 4000); // 약간 여유 있게
        return () => clearInterval(timer);
    }, []);

    const current = quotes[index];

    return (
        <div className="w-80 bg-white rounded-xl shadow-lg px-6 py-8 border border-purple-100 text-center transition-all duration-500">
            <p className="text-lg font-medium text-gray-700 leading-relaxed mb-4 whitespace-pre-line">
                “{current.content}”
            </p>
            <p className="text-sm text-gray-500 font-semibold">- {current.author}</p>

            {/* 인디케이터 */}
            <div className="mt-4 flex justify-center gap-2">
                {quotes.map((_, i) => (
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
