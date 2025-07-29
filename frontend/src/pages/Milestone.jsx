
import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { CameraIcon, SparklesIcon } from "@heroicons/react/24/solid";
import Sidebar from "../components/Sidebar";

export default function StyleCam() {
  const videoRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [mode, setMode] = useState("style");
  const [gender, setGender] = useState("남성");
  const [age, setAge] = useState(25);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* 카메라 ON */
  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(str => (videoRef.current.srcObject = str))
      .catch(e => alert(e.message));
  }, []);

  /* 셔터 */
  const shoot = () => {
    const v = videoRef.current;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;  c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    c.toBlob(b => setCaptured(b), "image/jpeg");
    setResult(null);
  };

  /* 분석 */
  const analyze = async () => {
    if (!captured) return alert("먼저 캡처하세요!");
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("image", captured, "shot.jpg");
      fd.append("mode", mode);  fd.append("gender", gender);  fd.append("age", age);
      const { data } = await axios.post("/api/style/analyze", fd);
      setResult(data.result);
    } catch (e) {
      alert("분석 실패: " + (e.response?.data?.error || e.message));
    } finally { setLoading(false); }
  };

    /* ───── 결과 카드 ───── */
    const ResultBox = () => {
    if (!result) return null;

    /* ▸ 얼굴 설명(text) → 문단 & 리스트 자동 파싱 */
    if (mode === "face") {
        // 1. 제목 한 줄(첫 줄) + 나머지 본문 분리
        const [title, ...bodyLines] = result.trim().split(/\r?\n/);

        // 2. 번호·점(or 하이픈)으로 시작하면 리스트 항목으로
        const items = bodyLines
        .filter(l => l.trim().length)               // 빈 줄 제거
        .map((l, i) => {
            const matched = l.match(/^\s*\d+[.)]\s*(.*)$/)   // "1.  내용"
                        || l.match(/^\s*-\s*(.*)$/);         // "-  내용"
            return matched ? (
            <li key={i} className="mb-1 leading-relaxed">{matched[1]}</li>
            ) : <p key={i} className="mb-2 leading-relaxed">{l}</p>;
        });

        return (
        <div className="glass-card text-gray-800">
            <h3 className="font-semibold text-lg mb-2 text-pink-700">{title}</h3>
            {items.some(el => el.type === "li") ? <ul className="pl-4 list-disc">{items}</ul> : items}
        </div>
        );
    }

    /* ▸ JSON 파싱 (style / color) */
    let obj;
    try { obj = JSON.parse(result); } catch {
        return <pre className="glass-card whitespace-pre-wrap break-keep">{result}</pre>;
    }

    if (mode === "style") {
        return (
        <div className="flex flex-col gap-4 w-full max-w-xl">
            {Object.entries(obj).map(([cat, arr]) => (
            <div key={cat} className="glass-card">
                <h3 className="font-semibold text-pink-600 mb-2 capitalize">{cat}</h3>
                {arr.map(it => (
                <a key={it.link} href={it.link} target="_blank" rel="noreferrer"
                    className="block text-sm underline text-blue-700 mb-1">
                    {it.title} — {it.desc}
                </a>
                ))}
            </div>
            ))}
        </div>
        );
    }

    if (mode === "color") {
        return (
        <div className="glass-card">
            <h3 className="font-semibold mb-2">🎨 시즌 추정: {obj.season}</h3>
            <p><b>베스트:</b> {obj.best.join(", ")}</p>
            <p><b>피해야 함:</b> {obj.avoid.join(", ")}</p>
            <p className="mt-2">{obj.summary}</p>
        </div>
        );
    }
    return null;
    };


  /* ────────── UI ────────── */
  return (
    <div className="flex h-screen overflow-hidden">
      {/* 좌측 사이드바 */}
      <Sidebar />

      {/* 우측 메인 */}
      <section className="flex-1 flex flex-col items-center
                          bg-gradient-to-br from-[#fff3f5] via-[#f7f4ff] to-[#eaf5ff]
                          p-10 overflow-y-auto">
        <h2 className="text-3xl font-extrabold mb-6 bg-gradient-to-r
                       from-[#e37571] via-[#e37571] to-[#b8baed]
                       text-transparent bg-clip-text drop-shadow">
          AI 스타일 카메라
        </h2>

        {/* 비디오 + 폼 */}
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* live video */}
          <div className="relative">
            <video ref={videoRef} autoPlay muted
                   className="rounded-3xl w-72 h-96 object-cover shadow-lg ring-4 ring-white/30" />
            {captured && (
              <img src={URL.createObjectURL(captured)} alt="cap"
                   className="absolute -right-4 -bottom-4 w-24 h-32
                              rounded-xl ring-2 ring-white shadow-md" />
            )}
          </div>

          {/* form */}
          <div className="flex flex-col gap-4 w-72">
            <select value={mode} onChange={e=>setMode(e.target.value)} className="select-field">
              <option value="style">스타일 개선</option>
              <option value="face">얼굴 설명</option>
              <option value="color">퍼스널컬러</option>
            </select>

            <div className="flex gap-2">
              <select value={gender} onChange={e=>setGender(e.target.value)}
                      className="select-field flex-1">
                <option>남성</option><option>여성</option>
              </select>
              <input type="number" value={age} onChange={e=>setAge(e.target.value)}
                     className="select-field w-20 text-center" />
            </div>

            <div className="flex gap-2">
              <button onClick={shoot}
                      className="action-btn active:scale-95">
                <CameraIcon className="w-5 h-5 mr-1"/> 캡처
              </button>
              <button onClick={analyze} disabled={loading}
                      className="action-btn active:scale-95 disabled:scale-100">
                <SparklesIcon className="w-5 h-5 mr-1"/>
                {loading ? "분석 중…" : "분석"}
              </button>
            </div>
          </div>
        </div>

        {/* 결과 */}
        <div className="mt-8 flex flex-col items-center gap-4 w-full">
          <ResultBox />
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------
   Tailwind utilities (globals.css 등)
------------------------------------------------------------------- */

