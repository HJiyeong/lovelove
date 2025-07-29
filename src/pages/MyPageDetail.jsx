import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const academicData = [
  { month: "Jan", 성취도: 82 },
  { month: "Feb", 성취도: 88 },
  { month: "Mar", 성취도: 75 },
  { month: "Apr", 성취도: 90 },
  { month: "May", 성취도: 86 },
  { month: "Jun", 성취도: 92 },
  { month: "Jul", 성취도: 87 },
  { month: "Aug", 성취도: 94 },
  { month: "Sep", 성취도: 89 },
  { month: "Oct", 성취도: 91 },
  { month: "Nov", 성취도: 93 },
  { month: "Dec", 성취도: 95 },
];

function MyPageDetail() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 font-sans">
      {/* 상단 프로필 */}
      <div className="bg-white rounded-2xl shadow-md p-6 flex items-center gap-6 mb-8">
        <img src="/user-icon.png" alt="user" className="w-24 h-24 rounded-full shadow" />
        <div>
          <h2 className="text-xl font-bold text-gray-800">김교육</h2>
          <p className="text-sm text-gray-500">k-education@mail.com</p>
          <p className="text-sm text-purple-500 mt-1">미래 개발자를 꿈꾸는 예비 창의인재</p>
        </div>
      </div>

      {/* 학업 성취도 그래프 */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-10">
        <h3 className="text-lg font-bold text-gray-700 mb-4">📊 월별 학업 성취도</h3>
        <div className="w-full h-60">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={academicData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="성취도" stroke="#8a63d2" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 자기소개서 카드들 */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-700 mb-4">📝 자기소개서</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h4 className="font-semibold text-purple-700">2025 대학 입시용 자기소개서</h4>
            <p className="text-sm text-gray-600 mt-2">창의적인 문제 해결 능력을 강조한 자기소개서입니다.</p>
            <button className="text-sm text-purple-500 mt-3 font-semibold">✏️ 수정</button>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-md">
            <h4 className="font-semibold text-purple-700">AI 연구소 인턴 지원용</h4>
            <p className="text-sm text-gray-600 mt-2">기술에 대한 열정과 성장 경험을 중심으로 작성했습니다.</p>
            <button className="text-sm text-purple-500 mt-3 font-semibold">✏️ 수정</button>
          </div>
        </div>
      </div>

      {/* 진로 활동 기록 */}
      <div className="mb-16">
        <h3 className="text-lg font-bold text-gray-700 mb-4">🚀 진로 활동 기록</h3>
        <ul className="space-y-3">
          <li className="bg-white p-4 rounded-xl shadow-sm">
            <p className="font-semibold text-gray-700">AI 경진대회 참가 (2025.03 ~ 2025.04)</p>
            <p className="text-sm text-gray-500">자율주행 데이터셋 활용한 실시간 객체 탐지 프로젝트</p>
          </li>
          <li className="bg-white p-4 rounded-xl shadow-sm">
            <p className="font-semibold text-gray-700">캡스톤 디자인 프로젝트 (2024.09 ~ 2024.12)</p>
            <p className="text-sm text-gray-500">진로 추천 챗봇 웹 서비스 구축 및 UI 설계</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyPageDetail;
