import { useSearchParams, useNavigate } from "react-router-dom";
import { personalityTypes } from "../data/personalityTypes";
import PersonalityCard from "../components/PersonalityCard";
import html2canvas from "html2canvas";
import { useRef } from "react";

const TestResult = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const type = searchParams.get("type");
  const typeData = personalityTypes[type];
  const cardRef = useRef(null); // ✅ 카드에만 ref 적용

  const handleGoHome = () => navigate("/");
  const handleRetry = () => navigate("/testpage");

  const handleDownloadImage = async () => {
    if (!cardRef.current) return;

    const canvas = await html2canvas(cardRef.current, {
      scale: 1.3,         // ✅ 이미지 품질 향상
      useCORS: true,
      backgroundColor: null, // ✅ 배경 투명하게 (필요 시)
    });

    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `연애성향_${type}.png`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#feeaff] via-[#ebd0f2] to-[#d4c1f4] px-4 py-10 flex flex-col items-center">
      
      {/* ✅ PersonalityCard만 감싼 캡처 영역 */}
      <div
        ref={cardRef}
        className="mt-12 bg-white rounded-3xl shadow-xl"
      >
        <PersonalityCard typeData={typeData} />
      </div>

      {/* 버튼들 */}
      <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-center mb-8">
        <button
          onClick={handleGoHome}
          className="bg-white text-[#8b495a] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-100 transition"
        >
          메인화면으로
        </button>
        <button
          onClick={handleRetry}
          className="bg-white text-[#8b495a] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-pink-100 transition"
        >
          다시 테스트하기
        </button>
        <button
          onClick={handleDownloadImage}
          className="bg-green-200 text-[#2f3e2f] font-semibold px-6 py-3 rounded-full shadow-md hover:bg-green-300 transition"
        >
          결과 이미지로 저장하기
        </button>
      </div>
    </div>
  );
};

export default TestResult;