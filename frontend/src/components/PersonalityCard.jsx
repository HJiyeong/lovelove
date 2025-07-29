const PersonalityCard = ({ typeData }) => {
  if (!typeData) return null;

  const { title, subtitle, paragraphs, emoji } = typeData;

  return (
    <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl w-full text-center space-y-4">
      

      {/* 타이틀 */}
      <h2 className="text-3xl font-bold text-[#8b495a]">{title}</h2>

      {/* 서브타이틀 */}
      <p className="text-lg italic text-[#6b3e55]">{subtitle}</p>

      {/* 설명 문단들 */}
      <div className="text-gray-700 mt-4 space-y-2 text-left">
        {paragraphs.map((p, idx) => (
          <p key={idx}>• {p}</p>
        ))}
      </div>

      {/* 이모지 */}
      <div className="text-5xl">{emoji}</div>
    </div>
  );
};

export default PersonalityCard;
