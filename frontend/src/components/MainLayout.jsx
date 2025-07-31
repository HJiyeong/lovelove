import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";          // 이미 components 폴더에 있죠?

export default function MainLayout() {
  return (
    <div className="flex w-full min-h-screen">
      {/* 왼쪽 고정 사이드바 */}
      <Sidebar />

      {/* 오른쪽 페이지 영역 */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />    {/* 여기에 각 페이지 컴포넌트가 렌더링됨 */}
      </main>
    </div>
  );
}
