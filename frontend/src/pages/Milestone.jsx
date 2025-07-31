import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Sparkles, Loader2 } from "lucide-react";

/**
 * 💄 StyleCam – realtime AI style advisor
 * -------------------------------------------------
 * – Live webcam preview with snapshot overlay
 * – Glassmorphism control panel & animated gradient blobs
 * – Smooth framer‑motion transitions
 * – TailwindCSS only (no extra CSS)
 */
export default function StyleCam() {
  const videoRef = useRef(null);
  const [captured, setCaptured] = useState(null);
  const [mode, setMode] = useState("style"); // style | face | color
  const [gender, setGender] = useState("남성");
  const [age, setAge] = useState(25);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ─── ① Turn camera on ─── */
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 640, height: 480 } })
      .then((s) => {
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((e) => alert("카메라 접근 실패: " + e.message));
  }, []);

  /* ─── ② Snapshot ─── */
  const shoot = () => {
    if (!videoRef.current) return;
    const v = videoRef.current;
    const c = document.createElement("canvas");
    c.width = v.videoWidth;
    c.height = v.videoHeight;
    c.getContext("2d").drawImage(v, 0, 0);
    c.toBlob((b) => setCaptured(b), "image/jpeg");
    setResult(null);
  };

  /* ─── ③ Analyze ─── */
  const analyze = async () => {
    if (!captured) return alert("먼저 캡처하세요!");
    setLoading(true);
    const fd = new FormData();
    fd.append("image", captured, "shot.jpg");
    fd.append("mode", mode);
    fd.append("gender", gender);
    fd.append("age", age);

    try {
      const { data } = await axios.post("/api/style/analyze", fd);
      setResult(data.result);
    } catch (e) {
      alert("분석 실패: " + (e.response?.data?.error || e.message));
    } finally {
      setLoading(false);
    }
  };

  /* ─── ④ Result renderer ─── */
  const ResultBox = () => {
    if (!result) return null;

    // non‑JSON => plain text
    let obj;
    if (mode !== "face") {
      try {
        obj = JSON.parse(result);
      } catch {
        return (
          <pre className="glass-card whitespace-pre-wrap break-keep max-w-xl">
            {result}
          </pre>
        );
      }
    }

    if (mode === "face") {
      const [title, ...body] = result.trim().split(/\r?\n/);
      const items = body
        .filter((l) => l.trim())
        .map((l, i) => <p key={i} className="mb-1 leading-relaxed">{l}</p>);
      return (
        <div className="glass-card max-w-xl text-gray-800">
          <h3 className="font-semibold text-lg mb-2 text-pink-700">{title}</h3>
          {items}
        </div>
      );
    }

    if (mode === "style") {
      return (
        <div className="flex flex-col gap-4 w-full max-w-xl">
          {Object.entries(obj).map(([cat, arr]) => (
            <div key={cat} className="glass-card">
              <h3 className="font-semibold text-pink-600 mb-2 capitalize">
                {cat}
              </h3>
              {arr.map((it) => (
                <a
                  key={it.link}
                  href={it.link}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-sm underline text-blue-700 mb-1"
                >
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
        <div className="glass-card max-w-xl text-gray-800">
          <h3 className="font-semibold mb-2">🎨 시즌 추정: {obj.season}</h3>
          <p>
            <b>베스트:</b> {obj.best.join(", ")}
          </p>
          <p>
            <b>피해야 함:</b> {obj.avoid.join(", ")}
          </p>
          <p className="mt-2">{obj.summary}</p>
        </div>
      );
    }
    return null;
  };

  /* ─── ⑤ UI ─── */
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-indigo-50 to-emerald-50">
      {/* floating blobs */}
      <motion.div
        className="absolute -top-32 -left-32 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
        transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"
        animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* glass container */}
      <motion.section
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80 }}
        className="relative z-10 w-full max-w-5xl mx-4 px-8 py-12 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl"
      >
        {/* header */}
        <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 mb-10 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-9 h-9" /> AI 스타일 카메라
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-10">
          {/* video */}
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="w-72 h-96 object-cover rounded-3xl shadow-lg ring-4 ring-white/30"
            />
            {captured && (
              <img
                src={URL.createObjectURL(captured)}
                alt="snapshot"
                className="absolute -right-4 -bottom-4 w-24 h-32 object-cover rounded-xl ring-2 ring-white shadow-md"
              />
            )}
          </div>

          {/* controls */}
          <div className="w-72 flex flex-col gap-4">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="select-field"
            >
              <option value="style">스타일 개선</option>
              <option value="face">얼굴 설명</option>
              <option value="color">퍼스널컬러</option>
            </select>

            <div className="flex gap-2">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="select-field flex-1"
              >
                <option>남성</option>
                <option>여성</option>
              </select>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="select-field w-20 text-center"
              />
            </div>

            <div className="flex gap-2">
              <button onClick={shoot} className="action-btn">
                <Camera className="w-5 h-5 mr-1" /> 캡처
              </button>
              <button onClick={analyze} disabled={loading} className="action-btn disabled:opacity-40">
                {loading ? (
                  <Loader2 className="w-5 h-5 mr-1 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5 mr-1" />
                )}
                {loading ? "분석 중…" : "분석"}
              </button>
            </div>
          </div>
        </div>

        {/* result */}
        <AnimatePresence>{!loading && <ResultBox />}</AnimatePresence>
      </motion.section>
    </div>
  );
}

