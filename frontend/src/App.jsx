import { Routes, Route } from "react-router-dom";
import { LoadScript } from "@react-google-maps/api";
import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Milestone from "./pages/Milestone";
import TestPage from "./pages/TestPage";
import TestResult from "./pages/TestResult";
import TestIntro from "./pages/Testintro";
import CareerDictionary from "./pages/CareerDictionary";
import Dateplace from "./pages/Dateplace";
import SearchPage from "./pages/SearchPage";
import CalendarPage from "./pages/CalendarPage";
import Chat from "./pages/Chat";
import MyPageDetail from "./pages/MyPageDetail";
import Setting from "./pages/Setting";
import Logout from "./pages/Logout";

function App() {
  return (
    <LoadScript googleMapsApiKey="AIzaSyC8fdcd_-n3LoGfb1l5AUj0X8W6I2L2G18">
      <Routes>
        {/* 모든 페이지 공통 레이아웃 */}
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />               {/* "/" */}
          <Route path="dateplace" element={<Dateplace />} />
          <Route path="testintro" element={<TestIntro />} />
          <Route path="test-result" element={<TestResult />} />
          <Route path="testpage" element={<TestPage />} />
          <Route path="dictionary" element={<CareerDictionary />} />
          <Route path="milestone" element={<Milestone />} />
          <Route path="settings" element={<Setting />} />
          <Route path="logout" element={<Logout />} />
          <Route path="chat" element={<Chat />} />
          <Route path="mypage-detail" element={<MyPageDetail />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="calendar" element={<CalendarPage />} />
        </Route>
      </Routes>
    </LoadScript>
  );
}

export default App;
