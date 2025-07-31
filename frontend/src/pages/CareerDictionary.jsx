import React, { useState, useCallback } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Camera, Loader2, CheckCircle2, XCircle } from "lucide-react";

/**
 * Ultra‑polished image analysis UI ✨ (v2)
 * – Result card now **hidden** until 실제 분석 결과가 도착
 */
export default function ImageAnalysisPage() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(""); // ← 초기값 공백
  const [loading, setLoading] = useState(false);

  /* dropzone */
  const onDrop = useCallback((acceptedFiles) => {
    if (!acceptedFiles[0]) return;
    const img = acceptedFiles[0];
    setFile(img);
    setPreview(URL.createObjectURL(img));
    setResult("");
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  /* analyse */
  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const { data } = await axios.post("/api/analyze/image", formData);
      setResult(data.analysis);
    } catch (err) {
      console.error(err);
      setResult(
        "❌ 분석에 실패했습니다. 이미지가 너무 흐릿하거나 인식이 어려울 수 있어요."
      );
    } finally {
      setLoading(false);
    }
  };

  /* helpers */
  const hasResult = result && result.trim().length > 0; // 분석 결과 존재 여부

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-50 via-indigo-50 to-emerald-50">
      {/* blobs */}
      <motion.div className="absolute -top-32 -left-32 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" animate={{ x: [0, 100, 0], y: [0, 50, 0] }} transition={{ duration: 18, repeat: Infinity, repeatType: "mirror" }} />
      <motion.div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" animate={{ x: [0, -100, 0], y: [0, -50, 0] }} transition={{ duration: 20, repeat: Infinity, repeatType: "mirror" }} />

      {/* glass card */}
      <motion.section initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 80 }} className="relative z-10 w-full max-w-3xl mx-4 px-10 py-12 bg-white/40 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl">
        {/* header */}
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-fuchsia-500 to-indigo-500 mb-2 flex items-center gap-2">
          <Sparkles className="w-8 h-8" /> 연애 대화 분석기
        </h1>
        <p className="text-gray-700/80 mb-10 text-sm leading-relaxed">
          캡처한 대화 이미지를 업로드하면, 말투와 흐름을 평가하고 <br /> 다음
          대화에서 사용할 수 있는 추천 답변까지 알려줘요.
        </p>

        {/* upload area */}
        <div {...getRootProps()} className={`group border-2 border-dashed rounded-2xl p-10 transition-colors cursor-pointer ${isDragActive ? "border-rose-400 bg-rose-50" : "border-gray-300/60 hover:border-indigo-400 hover:bg-indigo-50/20"}`}>
          <input {...getInputProps()} />
          {preview ? (
            <img src={preview} alt="preview" className="max-h-80 mx-auto rounded-xl shadow-lg" />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Camera className="w-12 h-12 mb-4" />
              <p className="font-medium mb-1">
                {isDragActive ? "이미지를 놓아주세요" : "이미지를 드래그하거나 클릭하여 업로드"}
              </p>
              <p className="text-xs opacity-70">PNG · JPG · JPEG</p>
            </div>
          )}
        </div>

        {/* action button */}
        <div className="mt-8 flex justify-center">
          <button onClick={analyze} disabled={!file || loading} className="relative inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-40 transition shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300">
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> 분석 중...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> 지금 분석하기
              </>
            )}
          </button>
        </div>

        {/* result */}
        <AnimatePresence>
          {hasResult && !loading && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="mt-10 bg-white/70 border border-white/40 shadow-inner rounded-2xl px-8 py-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-2">
                {result.startsWith("❌") ? <XCircle className="w-5 h-5 text-rose-500" /> : <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                <h2 className="text-lg font-bold text-gray-800">
                  {result.startsWith("❌") ? "분석 실패" : "분석 결과"}
                </h2>
              </div>
              <pre className="text-sm whitespace-pre-wrap text-gray-800 leading-relaxed">{result}</pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.section>
    </div>
  );
}

/* Tailwind helpers unchanged */
