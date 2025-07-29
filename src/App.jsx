import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Milestone from "./pages/Milestone";
import Test from "./pages/Test";
import Analytics from "./pages/Analytics";
import Chat from "./pages/chat";
import MyPageDetail from "./pages/MyPageDetail";
import JobLinks from "./pages/JobLinks";
import Diagnosis from "./pages/Diagnosis";
import Activities from "./pages/Activities";
import CareerDictionary from "./pages/CareerDictionary";
import SearchPage from "./pages/SearchPage";
import CalendarPage from "./pages/CalendarPage"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/milestone" element={<Milestone />} />
      <Route path="/test" element={<Test />} />
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/mypage-detail" element={<MyPageDetail />} />
      <Route path="/job-links" element={<JobLinks />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/dictionary" element={<CareerDictionary />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/calendar" element={<CalendarPage />} /> 
    </Routes>
  );
}

export default App;
