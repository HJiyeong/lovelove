import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";



// 👇 이걸 useRoadmap() 아래에 붙여
function RoadmapTimeline({ data, onMilestoneClick }) {
    return (
        <div className="relative h-[300px] w-full overflow-x-auto mt-10">
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="absolute top-1/2 left-0 h-[6px] bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"
            />
            {data?.years.map((year, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + idx * 0.2 }}
                    className="absolute top-[40%] flex flex-col items-center cursor-pointer"
                    style={{ left: `${(idx + 1) * 18}%` }}
                    onClick={() => {
                        const milestone = year.milestones?.[0];
                        if (milestone) {
                            onMilestoneClick(milestone);
                        }
                    }}
                >
                    <div className="w-10 h-10 bg-white border-4 border-purple-500 rounded-full flex items-center justify-center font-bold text-purple-700 shadow-md">
                        {idx + 1}
                    </div>
                    <div className="mt-2 text-sm text-center max-w-[120px] text-gray-800 font-semibold">
                        STEP {idx + 1}
                    </div>
                    <div className="text-xs text-gray-500">{year.theme}</div>
                </motion.div>
            ))}
        </div>
    );
}




/* ===== 로드맵 API 호출 훅 ===== */
function useRoadmap() {
  const [data, setData] = useState(null);          // <-- 타입 제거
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  return { data, loading, error, setData, setLoading, setError };
}



/* ===== 페이지 컴포넌트 ===== */
function CareerRoadmapPage() {
  const navigate = useNavigate();
  const { data, loading, error, setData, setLoading, setError } = useRoadmap();
    const sectionRefs = useRef([]); // 각 STEP 블록을 가리키는 참조들






    useEffect(() => {
    const fetchLocalDataAndGenerate = async () => {
      try {
        const [resultRes, favoriteRes] = await Promise.all([
          fetch("/data/result.json"),
          fetch("/data/favorite_job.json")
        ]);

        const result = await resultRes.json();
        const favorite = await favoriteRes.json();

        setResult(result);
        setFavorite(favorite);


          const fullPrompt = `
당신은 커리어 로드맵 생성기입니다.
아래는 사용자의 성향 검사 및 선호 직무 관련 데이터입니다.

[사용자 정보 JSON]
${JSON.stringify(result, null, 2)}

[선호 직무 리스트 JSON]
${JSON.stringify(favorite, null, 2)}

위 데이터를 참고하여 아래 Java 구조에 맞는 중고등학생 수준의 로드맵을 JSON으로 출력하세요. JSON에 들어갈 내용은 현실적이고 구체적인 내용이여야합니다. :

record RoadmapResponse(List<YearPlan> years){
  record YearPlan(int year, String theme, List<Milestone> milestones){}
  record Milestone(String id, String title, String quarter, String successMetric){}
}

• 계획 기간: ${result.horizonYears}년
• id 형식은 “${result.horizonYears}Y_Qx-n”을 사용하세요.
• 제목과 성공 지표는 반드시 한국어로 작성하세요.
꼭,, 직무랑 연관되게 하세요. 사용자의 관심 직무 분야를 파악하세요. 중/고등학생이 대상인걸 잊지마세요. 

• JSON만 출력하세요. 절대 설명문 붙이지 마세요.

다음과 같은 걸 출력하면 됩니다 {
  "years": [
    {
      "year": 1,
      "theme": "기초 다지기",
      "milestones": [
        { "id": "1Y_Q1-1", "title": "HTML/CSS 학습", "quarter": "Q1", "successMetric": "웹 페이지 구현" },
        ...
      ]
    },
    ...
  ]
}
`;

        const res = await axios.post("/api/roadmap/generate-custom", {
          prompt: fullPrompt,
        });

        console.log("✅ GPT 응답:", res.data);
        setData(res.data);

      } catch (e) {
        setError("파일 로딩 또는 API 호출 실패: " + e.message);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    fetchLocalDataAndGenerate();


  }, []);


    const [checkedMilestones, setCheckedMilestones] = useState([]);
    const [filterStep, setFilterStep] = useState("전체");

    const toggleMilestone = (id) => {
        setCheckedMilestones((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const themeColors = [
        "border-purple-500",
        "border-pink-500",
        "border-emerald-500",
        "border-sky-500",
        "border-orange-400"
    ];

    const totalMilestones = data
        ? data.years.reduce((sum, year) => sum + year.milestones.length, 0)
        : 1;




    /* 드로어 상태 */
  const [openMilestone, setOpenMilestone] = useState(null);
    const [result, setResult] = useState(null);
    const [favorite, setFavorite] = useState([]);


    return (
        <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans">
            {/* ── 사이드바 유지 ── */}
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {[
                            { label: "메인", path: "/" },
                            { label: "전공 검색", path: "/search" },
                            { label: "진로 백과사전", path: "/dateplace" },
                            { label: "진로 캘린더", path: "/calendar" },
                            { label: "설정", path: "/settings" },
                            { label: "로그아웃", path: "/logout" },
                        ].map(({ label, path }) => (
                            <button
                                key={label}
                                onClick={() => navigate(path)}
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition font-medium"
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* ── 메인 콘텐츠 ── */}
            <div className="flex-1 relative px-10 pb-16 pt-24">
                {/* 상단 소제목 */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-purple-700 flex items-center gap-2">
                        맞춤형 진로 로드맵
                    </h2>
                    <p className="text-sm text-gray-600 mt-1">
                        AI 커비가 추천하는 단계별 진로 설계 플랜을 따라가며 나만의 로드맵을 완성해보세요!
                    </p>
                </div>

                {/* 상단 바 */}
                <header className="fixed top-0 left-64 right-0 h-16 px-8 flex items-center justify-between bg-white/70 backdrop-blur border-b border-white/20 shadow z-50 rounded-bl-2xl">
                    <h1 className="text-xl font-bold text-purple-700"> 맞춤형 진로 로드맵</h1>
                    <nav className="flex gap-6 text-sm font-medium">
                        <Link to="/test" className="text-gray-600 hover:text-purple-600">적성검사</Link>
                        <Link to="/dateplace" className="text-gray-600 hover:text-purple-600">커리어 백과사전</Link>
                        <Link to="/milestone" className="text-gray-600 hover:text-purple-600">마일스톤</Link>
                        <Link to="/chat" className="px-4 py-2 rounded-full bg-purple-600 text-black shadow hover:bg-purple-700 whitespace-nowrap">💬 AI커비와 상담하기</Link>
                    </nav>
                </header>

                {/* 전체 완료율 */}
                {data && (
                    <div className="absolute top-6 right-10 flex items-center gap-3 bg-white shadow rounded-full px-4 py-2 z-40">
                        <div className="relative w-10 h-10">
                            <svg className="w-full h-full -rotate-90">
                                <circle cx="20" cy="20" r="18" stroke="#eee" strokeWidth="4" fill="none" />
                                <circle
                                    cx="20"
                                    cy="20"
                                    r="18"
                                    stroke="#7c3aed"
                                    strokeWidth="4"
                                    fill="none"
                                    strokeDasharray={2 * Math.PI * 18}
                                    strokeDashoffset={2 * Math.PI * 18 * (1 - (checkedMilestones.length / totalMilestones))}
                                    strokeLinecap="round"
                                />
                            </svg>
                            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs font-semibold text-purple-700">
              {Math.round((checkedMilestones.length / totalMilestones) * 100)}%
            </span>
                        </div>
                        <span className="text-sm text-gray-700">로드맵 진행률</span>
                    </div>
                )}

                <div className="pt-4">
                    {data && (
                        <div className="bg-purple-100 text-purple-800 px-4 py-2 rounded-xl font-medium mb-6 shadow-sm text-sm flex items-center gap-2">
                            <img src="/img_3.png" alt="AI 커비" className="w-6 h-6 rounded-full" />
                            💬 <b>AI 커비:</b> 아래 로드맵을 따라가며 하나씩 실천해보세요! STEP 1부터 시작해도 좋아요.
                        </div>
                    )}

                    {/* 사용자 요약 */}
                    {(result || favorite.length > 0) && (
                        <div className="bg-gradient-to-r from-purple-100 via-white to-purple-50 border-l-4 border-purple-500 shadow p-6 rounded-2xl mb-8">
                            <h2 className="text-lg font-bold text-purple-800 mb-1">🎯 사용자 진로 요약</h2>
                            <p className="text-sm text-gray-800 mb-1">📌 성향유형: <b className="text-purple-700">{result?.typeName || "성향 미지정"}</b></p>
                            <p className="text-sm text-gray-800"> 관심직업: <b className="text-purple-700">{favorite.map(f => f.jobNm).join(", ")}</b></p>
                        </div>
                    )}


                    {data && (
                        <>
                            <RoadmapTimeline
                                data={data}
                                onMilestoneClick={(ms) => {
                                    const idx = data.years.findIndex((year) =>
                                        year.milestones.some((m) => m.id === ms.id)
                                    );
                                    if (idx !== -1 && sectionRefs.current[idx]) {
                                        sectionRefs.current[idx].scrollIntoView({
                                            behavior: "smooth",
                                            block: "start",
                                        });
                                    }
                                    setOpenMilestone(ms);
                                }}
                            />


                        </>

                    )}



                    {/* 필터 탭 */}
                    {data && (
                        <div className="flex gap-2 mb-6">
                            {["전체", ...data.years.map((_, idx) => `STEP ${idx + 1}`)].map((label) => (
                                <button
                                    key={label}
                                    className={`px-4 py-1.5 rounded-full border ${
                                        filterStep === label ? "bg-purple-600 text-black" : "bg-white text-purple-700 border-purple-300"
                                    }`}
                                    onClick={() => setFilterStep(label)}
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* 로딩 */}
                    {loading && (
                        <div className="flex justify-center items-center h-96">
                            <div className="animate-spin rounded-full h-14 w-14 border-b-2 border-purple-600" />
                        </div>
                    )}

                    {/* 에러 */}
                    {error && <p className="text-center text-red-600">{error}</p>}

                    {/* 로드맵 */}
                    {data && (
                        <div className="space-y-6">
                            {(filterStep === "전체" ? data.years : data.years.filter((_, idx) => `STEP ${idx + 1}` === filterStep)).map((year, idx) => (
                                <motion.div
                                    key={year.year}
                                    className={`relative bg-white rounded-2xl shadow-xl p-6 border-l-4 ${themeColors[idx % themeColors.length]}`}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 * idx }}
                                >
                                    <div className="flex items-center gap-4 mb-4">


                                        <div className="w-4 h-4 bg-purple-500 rounded-full" />
                                        <div>
                                            <h3 className="text-lg font-semibold text-purple-700">STEP {idx + 1}: {year.theme}</h3>
                                            <p className="text-sm text-gray-500">{year.year}년 차</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <img src="/img_3.png" alt="AI 커비" className="w-6 h-6 rounded-full shadow" />
                                        <div className="bg-purple-50 border border-purple-300 px-3 py-1 rounded-xl text-xs text-purple-800 shadow">
                                            이 단계에서는 이런 활동들을 추천해요!
                                        </div>
                                    </div>


                                    <div className="grid gap-4 pl-6 border-l border-gray-200">
                                        {year.milestones.map((ms) => (
                                            <label key={ms.id} className="flex items-start gap-3 group hover:bg-purple-50 px-3 py-2 rounded-xl transition cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={checkedMilestones.includes(ms.id)}
                                                    onChange={() => toggleMilestone(ms.id)}
                                                    className="mt-1 accent-purple-600"
                                                />
                                                <div className="flex flex-col" onClick={() => setOpenMilestone(ms)}>
                                                    <span className="text-sm font-medium text-gray-800 group-hover:text-purple-700">{ms.title}</span>
                                                    <span className="text-xs text-gray-500">{ms.quarter} - {ms.successMetric}</span>
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 드로어 */}
                <AnimatePresence>
                    {openMilestone && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setOpenMilestone(null)}
                            />

                            <motion.div
                                className="fixed top-0 right-0 h-full w-[420px] bg-white shadow-xl p-8 z-50 flex flex-col"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ type: "tween" }}
                            >
                                {/* 상단 헤더 */}
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-xl font-bold text-purple-700">{openMilestone.title}</h2>
                                        <p className="text-sm text-gray-500">{openMilestone.quarter}</p>
                                    </div>
                                    <img src="/img_3.png" alt="AI 커비" className="w-10 h-10 rounded-full shadow" />
                                </div>

                                {/* 성공 기준 */}
                                <div className="flex items-center gap-2 mb-4 text-sm text-gray-700">
                                    <img src="/img_9.png" alt="성공기준" className="w-5 h-5" />
                                    <span><b className="text-purple-700">성공 기준:</b> {openMilestone.successMetric}</span>
                                </div>

                                {/* AI 커비 설명 */}
                                <div className="bg-purple-50 text-purple-800 text-sm rounded-xl p-3 mb-4 shadow-sm">
                                    💡 <b>AI 커비</b>가 추천하는 3주 학습 플랜이에요!
                                </div>

                                {/* 주차별 학습 플랜 */}
                                <div className="space-y-3 mb-6">
                                    {["1주차", "2주차", "3주차"].map((week, i) => (
                                        <div
                                            key={i}
                                            className="bg-purple-50 border-l-4 border-purple-400 p-4 rounded-xl text-sm text-gray-800 shadow-sm"
                                        >
                                            <span className="text-purple-700 font-semibold">{week}</span>
                                            <p className="mt-1">{week}에는 관련 주제를 집중적으로 학습하고 간단한 실습을 진행해보세요.</p>
                                        </div>
                                    ))}
                                </div>

                                {/* 닫기 버튼 */}
                                <button
                                    className="mt-auto px-4 py-2 rounded-full bg-purple-600 text-black hover:bg-purple-700 transition"
                                    onClick={() => setOpenMilestone(null)}
                                >
                                    닫기
                                </button>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>


            </div>
        </div>
    );


}

/* ===== YearBlock ===== */
function YearBlock({ year, onMilestoneClick }) {
  const progress = 0;

  return (
      <motion.div
          className="snap-center shrink-0 w-[340px] bg-white rounded-3xl shadow-lg p-6 flex flex-col"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (year.year % 10) }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-purple-700">{year.year}</h3>
            <p className="text-sm text-gray-500">{year.theme}</p>
          </div>
          <svg width="48" height="48" className="-rotate-90">
            <circle cx="24" cy="24" r="20" fill="none" stroke="#e5e7eb" strokeWidth="4" />
            <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="#7c3aed"
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 20}
                strokeDashoffset={2 * Math.PI * 20 * (1 - progress / 100)}
                strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="grid gap-3">
          {year.milestones.map((ms) => (
              <MilestoneCard key={ms.id} milestone={ms} onClick={() => onMilestoneClick(ms)} />
          ))}
        </div>
      </motion.div>
  );
}

/* ===== MilestoneCard ===== */
function MilestoneCard({ milestone, onClick }) {
  return (
      <motion.button
          className="w-full text-left bg-purple-50 hover:bg-purple-100/80 rounded-xl p-3 transition flex flex-col"
          whileHover={{ y: -2 }}
          onClick={onClick}
      >
        <span className="text-xs text-purple-600 mb-1">{milestone.quarter}</span>
        <span className="font-semibold text-gray-800">{milestone.title}</span>
      </motion.button>
  );
}

export default CareerRoadmapPage;
