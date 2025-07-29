import { useNavigate } from "react-router-dom";

const TestIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#feeaff] via-[#ebd0f2] to-[#d4c1f4] flex items-center justify-center px-4 py-10">
      <div className="bg-white fixed top-20 shadow-2xl rounded-2xl p-10 max-w-xl w-full text-center space-y-6">
       <h1 className="text-3xl font-bold text-[#8b495a]">연애 성향 테스트 💘</h1>

            <p className="text-gray-700 leading-relaxed text-base text-left">
            연애 성향 테스트는 나만의 사랑 방식과 감정 표현 습관, 데이트 스타일까지<br />
            연애에서 드러나는 다양한 행동과 태도를 5가지 축으로 분석해요.
            <br /><br />
            <strong>‘LS(Love Style)’</strong>: 연애에서 주도적인 편인가요, 아니면 상대에게 맞추는 편인가요?<br />
            <strong>‘EM(Emotion)’</strong>: 감정을 솔직히 표현하나요, 조심스럽게 절제하나요?<br />
            <strong>‘DL(Daily Life)’</strong>: 연애는 일상 속 루틴인가요, 즉흥적인 이벤트인가요?<br />
            <strong>‘DP(Date Preference)’</strong>: 계획형인가요, 자연스럽게 흐름을 따르나요?<br />
            <strong>‘PI(Physical Intimacy)’</strong>: 스킨십에 개방적인가요, 천천히 신뢰를 쌓고 나서 열리나요?
            <br /><br />
            이 테스트는 당신을 12가지 연애 성향 중 하나로 분류해요.<br />
            나도 몰랐던 내 연애 스타일을 지금 알아보세요!
            </p>

        </div>

        <button
          onClick={() => navigate("/testpage")}
          className=" fixed bottom-20  bg-[#8b495a] text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-[#a0566c] transition"
        >
          테스트 시작하기 ▶
        </button>
      </div>

  );
};

export default TestIntro;
