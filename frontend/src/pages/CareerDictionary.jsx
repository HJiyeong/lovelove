import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function ImageAnalysisPage() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setResult("");
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const { data } = await axios.post("/api/analyze/image", formData);
      setResult(data.analysis);
    } catch (error) {
      console.error("분석 실패:", error);
      setResult("❌ 분석에 실패했습니다. 이미지가 너무 흐릿하거나 인식이 어려울 수 있어요.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#fdf7fa] font-sans">
      {/* ✅ 사이드바 */}
      <Sidebar />

      {/* ✅ 본문 */}
      <main className="flex-1 p-10">
        <section className="max-w-3xl mx-auto bg-white rounded-3xl shadow-lg p-10">
          <h1 className="text-3xl font-bold text-pink-600 mb-2">💬 연애 대화 분석기</h1>
          <p className="text-gray-600 mb-8 text-sm">캡처한 대화 이미지를 분석해, 말투와 흐름을 평가하고 추천 답변까지 알려줘요.</p>

          {/* 이미지 업로드 영역 */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              이미지 업로드
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-pink-100 file:text-pink-700 hover:file:bg-pink-200"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="mt-6 max-h-[400px] rounded-xl shadow-md mx-auto"
              />
            )}
          </div>

          {/* 분석 버튼 */}
          <div className="text-center">
            <button
              onClick={handleAnalyze}
              disabled={!image || loading}
              className="inline-flex items-center justify-center bg-pink-600 hover:bg-pink-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition disabled:opacity-40"
            >
              {loading ? "분석 중..." : "🔍 지금 분석하기"}
            </button>
          </div>

          {/* 결과 출력 */}
          {result && (
            <div className="mt-10 bg-pink-50 border border-pink-200 p-6 rounded-2xl">
              <h2 className="text-lg font-bold text-pink-600 mb-2">📊 분석 결과</h2>
              <pre className="text-sm whitespace-pre-wrap text-gray-800">{result}</pre>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default ImageAnalysisPage;
