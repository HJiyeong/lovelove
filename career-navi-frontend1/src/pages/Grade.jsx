import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// ✅ 과목 분리
const MOCK_SUBJECTS = ["국어", "수학", "영어", "사회", "과학"];
const MOCK_SUBJECTS_JUNGSI = ["국어영역", "수학영역", "영어영역", "탐구영역1", "탐구영역2"];

const INITIAL_SUSHI = {
    "1-1": { 국어: "2", 수학: "3", 영어: "2", 사회: "3", 과학: "3" },
    "1-2": { 국어: "4", 수학: "2", 영어: "3", 사회: "2", 과학: "3" },
    "2-1": { 국어: "1", 수학: "3", 영어: "3", 사회: "1", 과학: "2" },
    "2-2": { 국어: "2", 수학: "2", 영어: "2", 사회: "2", 과학: "2" },
    "3-1": { 국어: "1", 수학: "2", 영어: "2", 사회: "1", 과학: "1" },
};

const INITIAL_JUNGSI = {
    "2023학년도 3월모의고사": { 국어영역: "2", 수학영역: "4", 영어영역: "1", 탐구영역1: "5", 탐구영역2: "5" },
    "2023학년도 6월모의고사": { 국어영역: "2", 수학영역: "5", 영어영역: "2", 탐구영역1: "5", 탐구영역2: "4" },
    "2023학년도 9월모의고사": { 국어영역: "2", 수학영역: "2", 영어영역: "1", 탐구영역1: "3", 탐구영역2: "5" },
    "2024학년도 3월모의고사": { 국어영역: "2", 수학영역: "3", 영어영역: "2", 탐구영역1: "3", 탐구영역2: "4" },
    "2024학년도 6월모의고사": { 국어영역: "4", 수학영역: "2", 영어영역: "4", 탐구영역1: "1", 탐구영역2: "1" },
    "2024학년도 9월모의고사": { 국어영역: "3", 수학영역: "4", 영어영역: "2", 탐구영역1: "2", 탐구영역2: "1" },
};

function calculateAvg(obj) {
    const values = Object.values(obj || {}).map((v) => parseInt(v)).filter(Boolean);
    return values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : "-";
}

function getFeedback(gradeMap) {
    const avgs = Object.values(gradeMap).map(calculateAvg).filter(v => v !== "-").map(Number);
    if (!avgs.length) return "성적 데이터가 부족해요. 몇 과목이라도 입력해주면 AI가 분석해드릴게요! 📄";

    const recentAvg = avgs[avgs.length - 1];
    const overallAvg = avgs.reduce((a, b) => a + b, 0) / avgs.length;
    const trend = avgs.slice(1).map((v, i) => v - avgs[i]);
    const up = trend.filter(x => x < 0).length;
    const down = trend.filter(x => x > 0).length;

    let comment = "";

    // 1. 성적 추세 분석
    if (up > down) {
        comment += "최근 성적이 조금씩 상승하고 있어요. 꾸준한 노력이 드러나고 있습니다. 💪\n";
    } else if (down > up) {
        comment += "최근 성적이 다소 하락세예요. 다시 기초를 정비하고 리듬을 되찾는 게 중요해요. 🔍\n";
    } else {
        comment += "성적이 일정하게 유지되고 있어요. 안정적인 학습이 돋보입니다. 👍\n";
    }

    // 2. 전체 평균 등급에 따른 피드백
    if (overallAvg <= 2.0) {
        comment += "우수한 평균 등급이에요! 상위권 대학을 충분히 노려볼 수 있습니다. 🚀\n";
    } else if (overallAvg <= 3.0) {
        comment += "좋은 성적입니다. 지금 페이스를 잘 유지하면 경쟁력 있는 지원이 가능해요. 🔥\n";
    } else if (overallAvg <= 4.0) {
        comment += "조금만 더 다듬으면 더 높은 등급도 충분히 가능해요. 📈\n";
    } else {
        comment += "성적이 다소 낮지만, 역전의 기회는 항상 있습니다. 기초부터 차근차근 쌓아봐요! 💡\n";
    }

    // 3. 최근 학기(또는 모의고사) 성적이 매우 높거나 낮은 경우
    if (recentAvg <= 1.5) {
        comment += "최근 성적이 특히 좋네요! 자신감을 갖고 도전해보세요. 💯";
    } else if (recentAvg >= 4.5) {
        comment += "최근 성적이 조금 아쉬워요. 공부 환경이나 습관을 점검해보는 것도 도움이 될 수 있어요.";
    }

    return comment.trim();
}

function getLastJungsiAvg(jungsiMap) {
    const lastKey = Object.keys(jungsiMap).slice(-1)[0];
    const scores = jungsiMap[lastKey] || {};
    const values = Object.values(scores).map(v => parseFloat(v)).filter(Boolean);
    const avg = values.length ? (values.reduce((a, b) => a + b, 0) / values.length).toFixed(2) : "-";
    return { avg, latest: lastKey };
}

function getJungsiRecommendation(lastAvg) {
    const g = parseFloat(lastAvg);
    if (isNaN(g)) return [];

    if (g <= 1.1) return ["서울대 - 자유전공학부", "연세대 - 컴퓨터과학과"];
    if (g <= 1.5) return ["고려대 - 기계공학부", "KAIST - 산업디자인학과"];
    if (g <= 2.0) return ["성균관대 - 글로벌경영학과", "서강대 - 경제학부"];
    if (g <= 2.5) return ["중앙대 - 미디어커뮤니케이션학부", "한국외대 - 일본어과"];
    if (g <= 3.0) return ["아주대 - 소프트웨어학과", "단국대 - 심리학과"];
    if (g <= 3.5) return ["숭실대 - 통계학과", "명지대 - AI학과"];
    return ["건국대 - 화학과", "세종대 - 스마트시스템소프트웨어학과"];
}

function getJungsiFeedback(latestGrades) {
    if (!latestGrades || Object.keys(latestGrades).length === 0) return "최근 모의고사 성적 정보가 부족해요.";

    const avg = calculateAvg(latestGrades);
    const comments = [];

    if (avg <= 1.5) comments.push("이번 모의고사 성적이 매우 우수합니다. 상위권 대학 진학이 기대됩니다. 🔥");
    else if (avg <= 2.5) comments.push("안정적인 성적이에요. 지금의 페이스를 유지하면 충분히 목표에 도달할 수 있어요.");
    else if (avg <= 3.5) comments.push("조금만 더 정교하게 마무리하면 충분히 경쟁력 있는 점수대입니다.");
    else comments.push("다소 아쉬운 결과지만, 다음 모의고사에서 개선 가능성이 충분해요. 힘내세요! 💪");

    // 세부 과목 중 1등급이 2개 이상이면 추가 멘트
    const topGrades = Object.values(latestGrades).filter(v => parseInt(v) === 1).length;
    if (topGrades >= 2) comments.push("특정 과목에서 매우 우수한 성과를 보였어요. 강점을 잘 살려보세요. ✅");

    return comments.join("\n");
}



function GradeCard({ dataMap, subjectList, editableKeys, onChange }) {
    return (
        <div className="h-[800px] overflow-y-scroll p-6 space-y-4 bg-gradient-to-br from-white via-purple-50 to-indigo-50">
            {Object.entries(dataMap).map(([key, data]) => (
                <div key={key} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
                    <h3 className="text-base font-bold text-purple-700 mb-2">{key}</h3>
                    <table className="w-full text-sm">
                        <tbody>
                        {subjectList.map((subj) => (
                            <tr key={subj} className="border-b">
                                <td className="py-1 font-medium text-gray-700">{subj}</td>
                                <td className="text-right text-purple-700">
                                    {editableKeys.includes(key) ? (
                                        <input
                                            type="number"
                                            min={1}
                                            max={9}
                                            value={data[subj] || ""}
                                            onChange={(e) => onChange(key, subj, e.target.value)}
                                            className="w-14 px-1 py-0.5 border rounded text-sm text-center"
                                        />
                                    ) : (
                                        data[subj] || "-"
                                    )}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <p className="mt-2 text-right text-sm text-gray-500">평균 등급: <span className="font-semibold text-purple-600">{calculateAvg(data)}</span></p>
                </div>
            ))}
        </div>
    );
}
function getAverageGradeAll(map) {
    const allValues = Object.values(map)
        .flatMap(obj => Object.values(obj).map(v => parseFloat(v)).filter(Boolean));
    return allValues.length ? (allValues.reduce((a, b) => a + b, 0) / allValues.length).toFixed(2) : "-";
}

function getRecommendedColleges(avg) {
    const grade = parseFloat(avg);
    if (isNaN(grade)) return { 교과: [], 종합: [] };

    if (grade <= 2.0) {
        return {
            교과: ["서울대 - 컴퓨터공학부", "연세대 - 기계공학과"],
            종합: ["KAIST - 전산학부", "DGIST - 정보통신융합전공"]
        };
    } else if (grade <= 3.0) {
        return {
            교과: ["한양대 - 소프트웨어학부", "서울과기대 - 산업디자인과"],
            종합: ["UNIST - 전기전자컴퓨터공학부", "성균관대 - 글로벌리더학과"]
        };
    } else if (grade <= 4.0) {
        return {
            교과: ["단국대 - 소프트웨어학과", "숭실대 - 정보통계학과"],
            종합: ["세종대 - 빅데이터학과", "홍익대 - 소프트웨어융합학과"]
        };
    } else {
        return {
            교과: ["호서대 - 컴퓨터공학과", "대전대 - 인공지능학과"],
            종합: ["동덕여대 - 컴퓨터학과", "건양대 - AI소프트웨어학과"]
        };
    }
}

function Grade() {
    const navigate = useNavigate();
    const [mode, setMode] = useState("sushi");
    const [sushiGrades, setSushiGrades] = useState(INITIAL_SUSHI);
    const [jungsiGrades, setJungsiGrades] = useState(INITIAL_JUNGSI);
    const totalAverage = getAverageGradeAll(sushiGrades);
    const { 교과: recoGyogwa, 종합: recoJonghap } = getRecommendedColleges(totalAverage);
    const [showGyogwa, setShowGyogwa] = useState(false);
    const [showJonghap, setShowJonghap] = useState(false);


    const handleChange = (setFunc, key, subject, value) => {
        setFunc(prev => ({
            ...prev,
            [key]: { ...prev[key], [subject]: value },
        }));
    };

    const data = mode === "sushi" ? sushiGrades : jungsiGrades;
    const subjects = mode === "sushi" ? MOCK_SUBJECTS : MOCK_SUBJECTS_JUNGSI;
    //const editable = mode === "sushi" ? Object.keys(data) : Object.keys(data).filter(k => k.includes("2025"));
    const editable = Object.keys(data);
    const setFunc = mode === "sushi" ? setSushiGrades : setJungsiGrades;

    const chartData = {
        labels: Object.keys(data),
        datasets: [
            {
                label: "평균 등급",
                data: Object.values(data).map(calculateAvg).map(Number),
                backgroundColor: "rgba(139, 92, 246, 0.6)",
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className="flex min-h-screen font-sans">
            <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
                <div>
                    <div className="p-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
                        <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
                    </div>
                    <nav className="flex flex-col gap-3">
                        {[
                            { label: "메인", path: "/" },
                            { label: "전공 검색", path: "/search" },
                            { label: "진로 백과사전", path: "/dictionary" },
                            { label: "진로 캘린더", path: "/calendar" },
                            { label: "설정", path: "/settings" },
                            { label: "로그아웃", path: "/logout" },
                        ].map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => navigate(item.path)}
                                className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                            >
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </aside>

            <main className="flex-1 bg-gradient-to-br from-purple-50 to-indigo-100 pt-24 px-10 pb-20">
                <header
                    className="
    fixed top-0 left-64 right-0
    h-16 px-8
    grid grid-cols-[auto_1fr_auto] items-center
    bg-white/60 backdrop-blur-lg
    border-b border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]
    rounded-bl-2xl z-50
  "
                >
                    <h1 className="text-xl font-bold text-purple-600 whitespace-nowrap">
                        성적표&nbsp;확인
                    </h1>

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
                                dangerouslySetInnerHTML={{ __html: label }}
                            />
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
                            💬 AI커비와&nbsp;상담하기
                        </Link>
                    </nav>
                </header>

                <div className="max-w-7xl mx-auto space-y-10">
                    <section className="bg-white/50 backdrop-blur-sm border border-purple-100 rounded-2xl p-6 shadow">
                        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">📈 나의 성적 변화 분석</h1>
                        <p className="text-gray-600 text-sm">
                            수시·정시 성적을 기반으로 변화 추이를 파악하고 진로 설정에 활용해보세요.<br />
                            AI 커비의 분석 결과를 확인해보세요! 🚀
                        </p>
                    </section>

                    <div className="flex justify-center gap-4">
                        <button onClick={() => setMode("sushi")} className={`px-6 py-2 rounded-full font-semibold shadow ${mode === "sushi" ? "bg-purple-600 text-black" : "bg-white text-purple-600 border"}`}>수시 성적표</button>
                        <button onClick={() => setMode("jungsi")} className={`px-6 py-2 rounded-full font-semibold shadow ${mode === "jungsi" ? "bg-purple-600 text-black" : "bg-white text-purple-600 border"}`}>정시 성적표</button>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-6">
                        <div className="xl:w-1/2 w-full bg-white border border-[#fff3ed] rounded-xl shadow p-6">
                            <h3 className="text-xl font-bold text-purple-700 mb-4">📊 {mode === "sushi" ? "수시 평균 등급" : "정시 평균 등급"}</h3>
                            <Bar
                                data={chartData}
                                options={{
                                    responsive: true,
                                    scales: {
                                        y: {
                                            reverse: true,
                                            min: 1,
                                            max: 9,
                                            ticks: { stepSize: 1 },
                                            title: { display: true, text: "등급" },
                                        },
                                    },
                                }}
                            />
                            {mode === "sushi" && (
                                <div className="mt-6 bg-purple-50 border border-[#fff3ed] rounded-lg p-4 text-sm text-purple-800 whitespace-pre-line">
                                    <strong>AI 커비 코멘트:</strong> {getFeedback(data)}
                                </div>
                            )}

                            {/* 평균 등급 강조 표시 */}
                            {mode === "sushi" && (
                                <div className="mt-6 text-center bg-white border border-purple-300 rounded-xl p-6 shadow">
                                    <p className="text-lg text-gray-600">전체 평균 등급</p>
                                    <h2 className="text-4xl font-extrabold text-purple-700">{totalAverage}</h2>
                                    <p className="mt-2 text-sm text-gray-500">※ 등급에 따라 추천 대학이 아래에 제시됩니다.</p>
                                </div>
                            )}

                            {mode === "jungsi" && (
                                <>
                                    {/* 1️⃣ 커비 코멘트 */}
                                    <div className="mt-6 bg-purple-50 border border-[#fff3ed] rounded-lg p-4 text-sm text-purple-800 whitespace-pre-line">
                                        <strong>AI 커비 코멘트:</strong>{" "}
                                        {getJungsiFeedback(jungsiGrades[getLastJungsiAvg(jungsiGrades).latest])}
                                    </div>

                                    {/* 2️⃣ 주요 과목 성적 카드 - 수시 평균 등급 스타일 차용 */}
                                    {/* 2️⃣ 주요 과목 성적 카드 - 수시 디자인 통일 + 가로 배치 + 괄호 제거 */}
                                    <div className="mt-6 text-center bg-white border border-purple-300 rounded-xl p-6 shadow">
                                        <p className="text-lg text-gray-600 mb-4">최근 모의고사 주요 과목 성적</p>
                                        <div className="flex justify-center gap-6 text-2xl font-extrabold text-purple-700">
                                            <span>국어: {jungsiGrades[getLastJungsiAvg(jungsiGrades).latest]["국어영역"]}</span>
                                            <span>영어: {jungsiGrades[getLastJungsiAvg(jungsiGrades).latest]["영어영역"]}</span>
                                            <span>수학: {jungsiGrades[getLastJungsiAvg(jungsiGrades).latest]["수학영역"]}</span>
                                            <span>탐구1: {jungsiGrades[getLastJungsiAvg(jungsiGrades).latest]["탐구영역1"]}</span>
                                            <span>탐구2: {jungsiGrades[getLastJungsiAvg(jungsiGrades).latest]["탐구영역2"]}</span>
                                        </div>
                                        <p className="mt-4 text-sm text-gray-500">
                                            ※ {getLastJungsiAvg(jungsiGrades).latest} 기준 분석
                                        </p>
                                    </div>

                                    {/* 3️⃣ 추천 대학 카드 - 그대로 두되 간격만 수시처럼 */}
                                    <div className="mt-6 bg-white border border-purple-300 rounded-xl shadow p-4 space-y-3">
                                        <h4 className="text-lg font-bold text-purple-700">🎯 정시 기준 추천 대학</h4>
                                        <ul className="list-disc pl-6 text-sm text-gray-800 mt-2">
                                            {getJungsiRecommendation(getLastJungsiAvg(jungsiGrades).avg).map((univ, idx) => (
                                                <li key={idx}>{univ}</li>
                                            ))}
                                        </ul>
                                    </div>

                                </>
                            )}







                            {/* 추천 토글 */}
                            {mode === "sushi" && (
                                <div className="mt-4 bg-white border border-purple-300 rounded-xl shadow p-4 space-y-3">
                                    <h4 className="text-lg font-bold text-purple-700">🎓 전형별 추천 대학</h4>

                                    <button
                                        onClick={() => setShowGyogwa(!showGyogwa)}
                                        className="text-left w-full px-4 py-2 bg-purple-50 border border-[#fff3ed] rounded hover:bg-purple-100 font-medium text-purple-800"
                                    >
                                        📘 교과전형 추천 보기
                                    </button>
                                    {showGyogwa && (
                                        <ul className="list-disc pl-6 text-sm text-gray-800 mt-2">
                                            {recoGyogwa.map((univ, idx) => <li key={idx}>{univ}</li>)}
                                        </ul>
                                    )}

                                    <button
                                        onClick={() => setShowJonghap(!showJonghap)}
                                        className="text-left w-full px-4 py-2 bg-indigo-50 border border-indigo-200 rounded hover:bg-indigo-100 font-medium text-indigo-800"
                                    >
                                        📙 학생부종합전형 추천 보기
                                    </button>
                                    {showJonghap && (
                                        <ul className="list-disc pl-6 text-sm text-gray-800 mt-2">
                                            {recoJonghap.map((univ, idx) => <li key={idx}>{univ}</li>)}
                                        </ul>
                                    )}
                                </div>
                            )}



                        </div>

                        <div className="xl:w-1/2 w-full bg-white border border-purple-300 rounded-2xl shadow-xl overflow-hidden">
                            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 border-b border-[#fff3ed]">
                                <div className="w-3 h-3 bg-red-400 rounded-full shadow-inner" />
                                <div className="w-3 h-3 bg-yellow-300 rounded-full shadow-inner" />
                                <div className="w-3 h-3 bg-green-400 rounded-full shadow-inner" />
                                <span className="ml-4 text-sm font-medium text-purple-700 tracking-tight">나의 성적 요약</span>
                            </div>
                            <GradeCard dataMap={data} subjectList={subjects} editableKeys={editable} onChange={(k,s,v)=>handleChange(setFunc,k,s,v)} />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Grade;
