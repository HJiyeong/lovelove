// src/pages/MyPageDetail.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Filler,
} from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

export default function MyPageDetail() {
  const navigate                 = useNavigate();
  const chartInstanceRef         = useRef(null);
  const [year, setYear]          = useState(2025);

  /* ───── 프로필 수정 상태 ───── */
  const [goal, setGoal]          = useState("프로그래머");
  const [school, setSchool]      = useState("교육고 3학년");
  const [editing, setEditing]    = useState(false);

  /* ───── JSON 로드 ───── */
  const [trait, setTrait]        = useState(null);
  const [favJobs, setFavJobs]    = useState([]);
  const [loading, setLoading]    = useState(true);

  useEffect(() => {
    (async () => {
      const [t, f] = await Promise.all([
        fetch("/data/result.json").then(r => r.json()),
        fetch("/data/favorite_job.json").then(r => r.json()),
      ]);
      setTrait(t);
      setFavJobs(f);
      setLoading(false);
    })();
  }, []);

  /* ───── 차트 데이터 (샘플) ───── */
  const labels    = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
  const yearScores = {
  2024: {
    my:  [42, 44, 46, 50, 53, 52, 54, 56, 58, 59, 61, 63],
    avg: [48, 47, 49, 50, 52, 51, 53, 54, 56, 55, 57, 58],
  },
  2025: {
    my:  [30, 50, 45, 60, 55, 40, 50, 65, 75, 60, 58, 62],
    avg: [50, 48, 52, 49, 53, 50, 55, 57, 60, 59, 57, 58],
  },
};

  

const chartData = {
  labels,
  datasets: [
    {
      label: "내 점수",
      data: yearScores[year]?.my || [],
      fill: true,
      tension: 0.4,
      borderWidth: 2,
      pointRadius: 4,
      borderColor: ctx => {
        const g = ctx.chart.ctx.createLinearGradient(0, 0, ctx.chart.width, 0);
        g.addColorStop(0, "#8b5cf6");
        g.addColorStop(1, "#ec4899");
        return g;
      },
      backgroundColor: "rgba(139,92,246,0.15)",
    },
    {
      label: "평균",
      data: yearScores[year]?.avg || [],
      borderColor: "#22d3ee",
      borderWidth: 2,
      tension: 0.4,
      pointRadius: 0,
    },
  ],
};


  
  const chartOptions = {
    responsive: true,
    animation: { duration: 1200 },
    plugins: { legend: { position: "right" } },
    scales: { y: { beginAtZero: true, ticks: { stepSize: 20 } } },
  };

  if (!yearScores[year]) {
  return <p className="text-center text-red-500 py-32">해당 연도의 점수 데이터가 없습니다.</p>;
}


  if (loading) return <p className="py-32 text-center text-gray-500">불러오는 중…</p>;

  /* ──────────────────────────────────────────────── */
  return (
      <div className="flex min-h-screen font-sans">
        {/* 🟣 사이드바 (SearchPage와 동일) */}
        <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
          <div>
            <div className="p-3 mb-10 flex items-start justify-start pl-0">
              <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
            </div>
            <nav className="flex flex-col gap-3">
              {["메인","전공 검색","진로 백과사전","진로 캘린더","설정","로그아웃"].map((label, idx) => (
                  <Link
                      key={idx}
                      to={["/","/search","/dictionary","/calendar","/settings","/logout"][idx]}
                      className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                  >
                    {label}
                  </Link>
              ))}
            </nav>
          </div>
        </
        aside>

        {/* 🎯 메인 콘텐츠 + 상단 고정 헤더 */}
        <div className="flex-1 relative bg-gradient-to-br from-indigo-50 to-purple-100 pt-24 px-6 pb-12">
          {/* 상단 고정 헤더( SearchPage와 동일 ) */}
          <header
              className="
    fixed top-0 left-64 right-0
    h-20 px-8
    grid grid-cols-[auto_1fr_auto] items-center   /* ← 균형 */
    bg-white/60 backdrop-blur-lg
    border-b border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]
    rounded-bl-2xl z-50
  "
          >
            {/* ① 페이지 타이틀 — 왼쪽 */}
            <h1 className="text-xl font-bold text-gray-800 whitespace-nowrap">
              마이페이지
            </h1>

            {/* ② 브랜드 — 컬럼 가운데에서 정확히 중앙 정렬 */}
            <div className="justify-self-center ml-48">
              <Link to="/" className="block select-none">


              <span
                  className="
                   text-2xl md:text-2xl font-extrabold
                  bg-gradient-to-r from-purple-600 to-pink-500
                  bg-clip-text text-transparent tracking-tight
                "
              >
                CareerNavi
              </span>
              </Link>
            </div>

            {/* ③ 네비 / CTA — 오른쪽 정렬 */}
            <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
              {[
                ["적성검사", "/test"],
                ["커리어&nbsp;백과사전", "/dictionary"],
                ["마일스톤", "/milestone"],
              ].map(([label, path]) => (
                  <Link
                      key={label}
                      to={path}
                      className="relative text-gray-600 hover:text-purple-600 transition group"
                  >
                    <span dangerouslySetInnerHTML={{ __html: label }} />
                    <span
                        className="
            absolute -bottom-1 left-0 h-[2px] w-0
            bg-purple-600 transition-all
            group-hover:w-full                /* underline 애니메이션 */
          "
                    />
                  </Link>
              ))}

              <Link
                  to="/chat"
                  aria-label="AI커비와 상담하기"
                  className="
        px-4 py-2 rounded-full
        bg-purple-600 text-black
        shadow hover:bg-purple-700
        hover:-translate-y-0.5 active:translate-y-0
        transition transform whitespace-nowrap
      "
              >
                💬 AI커비와 상담하기
              </Link>
            </nav>
          </header>



          {/* 실제 페이지 내용 */}
          <div className="max-w-6xl mx-auto space-y-14">

            {/* ① 프로필 */}
            <section className="flex items-center gap-8">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src="/img_1.png" alt="" className="w-full h-full object-cover" />
              </div>

              {!editing ? (
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-1">김교육</h3>
                    <p className="text-sm text-gray-600 mb-2">k-education@mail.com</p>
                    <div className="flex gap-6 text-sm font-medium text-purple-700">
                      <span>🎯 목표: {goal}</span>
                      <span>🏫 {school}</span>
                    </div>
                    <button
                        onClick={() => setEditing(true)}
                        className="mt-3 px-4 py-1.5 text-xs rounded-full bg-purple-600 text-black hover:bg-purple-700"
                    >
                      정보 수정
                    </button>
                  </div>
              ) : (
                  <div className="flex-1 space-y-2">
                    <label className="block text-sm">목표 진로
                      <input value={goal} onChange={e=>setGoal(e.target.value)}
                             className="w-full mt-1 px-3 py-2 border rounded-lg"/>
                    </label>
                    <label className="block text-sm">학교·학년
                      <input value={school} onChange={e=>setSchool(e.target.value)}
                             className="w-full mt-1 px-3 py-2 border rounded-lg"/>
                    </label>
                    <div className="flex gap-2 mt-2">
                      <button onClick={()=>setEditing(false)}
                              className="px-4 py-1.5 bg-purple-600 text-black text-xs rounded-full hover:bg-purple-700">
                        저장
                      </button>
                      <button onClick={()=>setEditing(false)}
                              className="px-4 py-1.5 bg-gray-200 text-xs rounded-full hover:bg-gray-300">
                        취소
                      </button>
                    </div>
                  </div>
              )}
            </section>

            {/* ② 성향 분석 */}
            <section className="bg-white border border-[#fff3ed] rounded-3xl shadow p-8">
              <h4 className="text-xl font-extrabold text-purple-700 mb-4">
                나의 성향: {trait.typeName}
              </h4>
              <ul className="flex flex-wrap gap-2 mb-3">
                {trait.keywords.map(k=>(
                    <li key={k} className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full font-semibold">#{k}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{trait.description}</p>
            </section>

            {/* ③ 점수 그래프 */}
            <section className="bg-white border border-[#fff3ed] rounded-3xl shadow p-8">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-xl font-bold text-purple-700">연간 역량 추이</h4>
                <div className="flex items-center gap-2">
                  <button onClick={()=>setYear(p=>p-1)} className="text-xl hover:text-purple-500">←</button>
                  <span>{year}</span>
                  <button onClick={()=>setYear(p=>p+1)} className="text-xl hover:text-purple-500">→</button>
                </div>
              </div>
              <div className="h-[340px]">
                <Line ref={chartInstanceRef} data={chartData} options={chartOptions}/>
              </div>
            </section>

            {/* ④ 찜한 직업 */}
            <section>
              <h4 className="text-xl font-bold text-gray-800 mb-4">⭐ 찜한 직업</h4>
              <div className="grid md:grid-cols-3 gap-6">
                {favJobs.map(({jobNm, jobWork, jobCd})=>(
                    <article key={jobCd} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 hover:shadow-lg transition">
                      <header className="flex justify-between items-center mb-2">
                        <h5 className="text-lg font-semibold text-purple-700">{jobNm}</h5>
                        <button onClick={()=>navigate(`/dictionary?jobCd=${jobCd}`)}
                                className="text-sm text-blue-600 hover:underline">자세히 →</button>
                      </header>
                      <p className="text-sm text-gray-600 line-clamp-4">{jobWork}</p>
                    </article>
                ))}
              </div>
            </section>

            {/* ⑤ 빠른 이동 */}
            <section className="grid md:grid-cols-3 gap-6">
              {[
                ["학업성취도 관리","/img_9.png","/grade"],
                ["자기소개서 관리","/img_10.png","/test/resume"],
                ["진로 활동 관리","/img_11.png","/activities"],
              ].map(([label,icon,to])=>(
                  <button key={label} onClick={()=>navigate(to)}
                          className="flex items-center gap-3 w-full bg-white px-5 py-4 rounded-2xl border border-gray-200 shadow hover:bg-purple-50 transition">
                    <img src={icon} alt="" className="w-10 h-10 rounded-xl"/>
                    <span className="text-sm font-medium text-gray-800">{label}</span>
                  </button>
              ))}
            </section>

            {/* ⑥ 추천 */}
            <section className="grid md:grid-cols-2 gap-6">
              {[
                ["AI 맞춤형 진로 로드맵","/job-links"],
                ["나만의 포트폴리오 리포트","/diagnosis"],
              ].map(([title,to])=>(
                  <button key={title} onClick={()=>navigate(to)}
                          className="bg-gradient-to-br from-blue-100 to-purple-100 border border-[#fff3ed] p-6 rounded-2xl text-center shadow hover:shadow-lg hover:scale-105 transition">
                    <p className="text-base text-gray-700 font-semibold mb-1">🎁 추천</p>
                    <h5 className="text-lg font-bold text-purple-700">{title}</h5>
                  </button>
              ))}
            </section>

          </div>
        </div>
      </div>
  );
}
