// Home.jsx
import React, { useEffect, useRef, useState  } from "react";
import { Link, useNavigate } from "react-router-dom";
import RecommendedSlide from "../components/RecommendedSlide";
import Sidebar from "../components/Sidebar";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const chartRef = useRef();
  const chartInstanceRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);



  const handleSearch = () => {
    const term = searchTerm.toLowerCase();
    if (term.includes("백과") || term.includes("진로")) {
      navigate("/dictionary");
    } else if (term.includes("전공")) {
      navigate("/search");
    } else if (term.includes("캘린더") || term.includes("일정")) {
      navigate("/calendar");
    } else if (term.includes("마이페이지")) {
      navigate("/mypage-detail");
    } else if (term.includes("검사") || term.includes("테스트")) {
      navigate("/testpage");
    } else {
      navigate("/search");
    }
  };
  const [year, setYear] = useState(2025);

  const scoreData = {
    2024: {
      my: [25, 35, 40, 50, 45, 42, 48, 55, 60, 58, 54, 50],
      avg: [40, 42, 44, 46, 48, 50, 52, 53, 54, 54, 53, 52],
    },
    2025: {
      my: [30, 50, 45, 60, 55, 40, 50, 65, 75, 60, 58, 62],
      avg: [50, 48, 52, 49, 53, 50, 55, 57, 60, 59, 57, 58],
    },
  };

  const validYears = Object.keys(scoreData).map(Number); // [2024, 2025]
  const minYear = Math.min(...validYears);
  const maxYear = Math.max(...validYears);


  const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const myScores = scoreData[year].my;
  const avgScores = scoreData[year].avg;

  const data = {
    labels,
    datasets: [
      {
        label: "나의 진로 점수",
        data: myScores,
        borderColor: (ctx) => {
          const gradient = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
          gradient.addColorStop(0, "#ec4899");
          gradient.addColorStop(1, "#8b5cf6");
          return gradient;
        },
        tension: 0.4,
        pointBackgroundColor: "#000",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
      {
        label: "학년 평균 점수",
        data: avgScores,
        borderColor: "#22d3ee",
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    animation: isVisible
        ? {
          duration: 1500,
          easing: "easeOutQuart", // 쫙 그려지는 느낌
        }
        : false,
    plugins: {
      legend: {
        display: true,
        position: "right",
        labels: {
          font: {size: 13},
          color: "#444",
          usePointStyle: true,
          padding: 20,
        },
      },
      tooltip: {
        backgroundColor: "#111",
        titleFont: { size: 12 },
        bodyFont: { size: 14 },
        callbacks: {
          label: (context) => {
            const labelMap = {
              0: "내 점수",
              1: "평균 점수",
            };
            return `${labelMap[context.datasetIndex]}: ${context.parsed.y} Points`;
          },
        },
      },

    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    layout: {
      padding: { top: 30 },
    },

    scales: {
      y: {
        ticks: { color: "#ccc", font: { size: 12 } },
        grid: { color: "#eee" },
        beginAtZero: true,
      },
      x: {
        ticks: { color: "#888", font: { size: 12 } },
        grid: { display: false },
      },
    },
  };

  useEffect(() => {
    const chart = chartInstanceRef.current;
    if (chart) {
      const elements = [
        { datasetIndex: 0, index: 4 }, // 나의 점수
        { datasetIndex: 1, index: 4 }, // 평균 점수
      ];
      chart.setActiveElements(elements);
      chart.tooltip.setActiveElements(elements, { x: 0, y: 0 }); // 초기 툴팁 활성화
      chart.update();
    }
  }, [year]);
  useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
    );
    if (chartRef.current) observer.observe(chartRef.current);
    return () => observer.disconnect();
  }, []);





  const handleChatClick = () => {
    navigate("/chat");
  };
  const handleMouseEnter = () => {
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 10); // 트리거 재활성화
  };




  return (
      <div className="flex min-h-screen bg-[#f9fafb] font-sans relative">
        {/* Main Content */}
        <main className="flex-1 p-10">


          {/* Hero Section - 개선된 AI 상담 박스 */}
          <section className="relative mb-16 rounded-3xl bg-gradient-to-br from-[#ffeded] to-[#fff3ed] p-10 shadow-xl">


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

              {/* 왼쪽 텍스트 영역 */}
              <div className="text-left">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 leading-snug">
                  나만을 위한
                  <span className="text-[#b05a57]"> 맞춤형 연애 고민 상담</span>
                </h1>

                <p className="text-lg text-gray-600 mb-6">
                  부끄러운 고민도, 서툰 마음도 괜찮아요 ! <span className="text-[#d66d69] font-semibold">AI 큐피</span>에게 모두 털어놔보세요.
                </p>

                <div
                    onClick={handleChatClick}
                    className="bg-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg hover:shadow-xl hover:scale-105 transition cursor-pointer border border-[#fff3ed] mb-4"
                >
                  <img src="/img_3.png" alt="AI 커비" className="w-16 h-16 rounded-xl border shadow-sm" />
                  <div className="text-left">
                    <p className="text-sm text-gray-500">연애 고민 상담 도우미 큐피(Qupy)</p>
                    <p className="text-lg font-bold text-[#d66d69]">
            <span className="inline-block bg-[#fff3ed] px-3 py-1 rounded-full shadow-sm hover:shadow-md transition">
              💬 지금 바로 상담해보세요
            </span>
                    </p>
                  </div>
                </div>

                <p className="text-sm text-gray-500 leading-relaxed">
                  연애 의지와 자신감을 되찾고 싶은가요?
                  <br className="hidden sm:inline" />
                  큐피는 당신의 이야기를 판단 없이 경청하며,
                  솔직한 대화를 통해 마음의 짐을 함께 덜어드립니다.
                </p>

                <p className="mt-4 text-sm italic text-[#d66d69]">
                  큐피(Qupy) = Cupid + Buddy.
                </p>
              </div>

              {/* 오른쪽 슬라이드 영역 */}
              <div className="flex flex-col items-end gap-6">

                {/* ✅ 우측 검색창 (상단 고정 아님) */}
                <div className="w-full max-w-sm">
                  <div className="flex items-center bg-white rounded-full shadow-md px-4">
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                        className="flex-1 py-2 outline-none text-gray-700 bg-transparent"
                    />
                    <button onClick={handleSearch} className="text-gray-400 hover:text-gray-600 text-xl">🔍</button>
                  </div>
                </div>

                {/* 슬라이드 */}
                <div className="w-full max-w-sm self-end ml-4">
                  <RecommendedSlide />
                </div>

              </div>

            </div>
          </section>





          {/* 기능 카드 - 진단 / 탐색 / 실천 */}
          <section className="grid grid-cols-3 gap-6 mb-16">
            {[
              { badge: '💘 진단', label: '연애 성향을 확인해봐요', to: '/testintro', color: 'from-[#e5d4f3] to-[#d4c1f4]', img: '/test.png', },
              { badge: '🫶 분석', label: '우리 대화를 들여다봐요', to: '/dictionary', color: 'from-[#f8d7e2] to-[#dfb7d8]', img: '/book.png' },
              { badge: '🎀 추천', label: '어울리는 스타일을 찾아봐요', to: '/milestone', color: 'from-[#d9e7f6] to-[#c1d4f0]', img: '/stop.png' }
            ].map(({ badge, label, to, color, img }) => (
                <Link to={to} key={to}>
                  <div className={`relative bg-gradient-to-r ${color} p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl hover:brightness-105 transition`}>
                    <div className="absolute top-3 left-3 bg-white text-[#8b495a] text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-[#fff3ed]">
                      {badge}
                    </div>
                    <img src={img} alt={label} className="w-20 mb-4 mx-auto" />
                    <p className="text-black text-xl font-bold text-center">{label}</p>
                  </div>
                </Link>
            ))}
          </section>

          {/* 마이페이지 */}
          <section className="mb-16">

              <div className="flex items-start gap-12 bg-white p-10 rounded-3xl shadow-md hover:shadow-lg hover:scale-[1.01] transition cursor-pointer">
                {/* 📈 그래프 */}
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-2xl font-bold text-gray-800">나의 커리어 여정</h2>
                    <div className="flex items-center gap-4 text-gray-700 font-semibold">
                      <button
                          type="button"
                          onClick={() => setYear((prev) => Math.max(minYear, prev - 1))}
                          className={`text-xl ${year === minYear ? "text-gray-300 cursor-not-allowed" : "hover:text-purple-500"}`}
                          disabled={year === minYear}
                      >
                        ←
                      </button>
                      <span>{year}</span>
                      <button
                          type="button"
                          onClick={() => setYear((prev) => Math.min(maxYear, prev + 1))}
                          className={`text-xl ${year === maxYear ? "text-gray-300 cursor-not-allowed" : "hover:text-purple-500"}`}
                          disabled={year === maxYear}
                      >
                        →
                      </button>
                    </div>

                  </div>
                  <p className="text-sm text-gray-500 mb-4">
                    나의 진로 점수와 같은 학년 평균을 비교한 그래프입니다.
                  </p>
                  <div
                      ref={chartRef}
                      onMouseEnter={handleMouseEnter}
                      className="w-full h-[360px] rounded-2xl bg-white p-6 shadow-sm"
                  >
                    <Line
                        ref={(chart) => {
                          chartRef.current = chart?.canvas?.parentNode;  // intersection observer용
                          chartInstanceRef.current = chart;              // Chart.js instance 저장
                        }}
                        data={data}
                        options={options}
                    />

                  </div>
                </div>


                {/* 🙋🏻‍♀️ 프로필 + 버튼 */}
                <div className="w-[320px] flex flex-col items-center">

                  {/* 프로필 카드 */}
                  <div className="relative w-full bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl pt-16 pb-6 px-6 text-center shadow-xl">
                    <Link
                        to="/mypage-detail"               /* <- 클릭 시 이동할 경로 */
                        className="hover:shadow-2xl transition"

                    >

                    {/* 프로필 이미지 - 카드 위 절반 겹침 */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                      <img
                          src="/img_8.png"
                          alt="배경"
                          className="absolute inset-0 w-full h-full object-cover"
                      />

                      {/* 인물 레이어 */}
                      <img
                          src="/img_1.png"
                          alt="프로필"
                          className="relative w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mt-4">김교육</h3>
                    <p className="text-sm text-gray-600 mb-4">k-education@mail.com</p>

                    <div className="flex justify-between px-4 text-sm font-semibold text-purple-700">
                      <div className="text-left">
                        <p className="text-[11px] text-gray-500 font-normal">목표진로</p>
                        <p>프로그래머</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[11px] text-gray-500 font-normal">학교 및 학년</p>
                        <p>교육고 3학년</p>
                      </div>
                    </div>
                    </Link>
                  </div>

                  {/* 버튼 카드 3개 */}
                  <div className="mt-6 w-full space-y-4">
                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/grade");
                        }}
                        className="flex items-center gap-3 w-full bg-white px-4 py-3 rounded-xl shadow transition hover:bg-purple-50"
                    >
                      <img src="/img_9.png" alt="icon" className="w-10 h-10 rounded-xl" />
                      <span className="text-sm font-medium text-gray-800">학업성취도 관리</span>
                    </button>

                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/test/resume");
                        }}
                        className="flex items-center gap-3 w-full bg-white px-4 py-3 rounded-xl shadow transition hover:bg-purple-50"
                    >
                      <img src="/img_10.png" alt="icon" className="w-10 h-10 rounded-xl" />
                      <span className="text-sm font-medium text-gray-800">자기소개서 관리</span>
                    </button>

                    <button
                        onClick={(e) => {
                          e.preventDefault();
                          navigate("/activities");
                        }}
                        className="flex items-center gap-3 w-full bg-white px-4 py-3 rounded-xl shadow transition hover:bg-purple-50"
                    >
                      <img src="/img_11.png" alt="icon" className="w-10 h-10 rounded-xl" />
                      <span className="text-sm font-medium text-gray-800">진로 활동 관리</span>
                    </button>
                  </div>
                </div>
              </div>

          </section>





          {/* 통계 카드 */}
          <section className="grid grid-cols-2 gap-6 mb-12">
            {[['김교육님을 위한!', '맞춤형 로드맵' , '/job-links'], ['김교육님을 위한!', '포트폴리오 리포트' , '/diagnosis']].map(([label, count, to]) => (
                <Link to={to} key={label}>
                  <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl shadow-md p-6 hover:shadow-xl hover:scale-105 transition-all duration-200 text-center border border-blue-200">
                    <h3 className="text-base font-semibold text-gray-700 mb-2">{label}</h3>
                    <p className="text-3xl font-extrabold text-purple-700">{count}</p>
                  </div>
                </Link>
            ))}
          </section>

        </main>
      </div>
  );
}

export default Home;
