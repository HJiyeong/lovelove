import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";          // 이미 components 폴더에 있죠?

export default function MainLayout() {
  return (
    <div className="flex w-full min-h-screen">
   {/* 사이드바 (겹치게) */}
  <div className="z-10 relative -mr-4">  {/* -mr-4 로 오른쪽으로 삐져나오게 */}
    <Sidebar />
  </div>

  {/* 메인 페이지 */}
  <main className="flex-1 relative z-0">
    <Outlet />
  </main>
</div>
  );
}
