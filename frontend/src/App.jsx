import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Milestone from "./pages/Milestone";
import TestPage from "./pages/TestPage"; 
import TestResult from './pages/TestResult';
import TestIntro from './pages/Testintro';

import Analytics from "./pages/Analytics";
import Chat from "./pages/Chat.jsx";
import MyPageDetail from "./pages/MyPageDetail";
import JobLinks from "./pages/JobLinks";
import Diagnosis from "./pages/Diagnosis";
import Activities from "./pages/Activities";
import CareerDictionary from "./pages/CareerDictionary";
import SearchPage from "./pages/SearchPage";
import CalendarPage from "./pages/CalendarPage";




import Grade from "./pages/Grade"; // 상단에 추가
import Setting from "./pages/Setting" ;
import Logout from "./pages/Logout" ;



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/testintro" element={<TestIntro />} />
      <Route path="/test-result" element={<TestResult />} />
       <Route path="/testpage" element={<TestPage />} />



      <Route path="/settings" element={< Setting/>} />
      <Route path="/logout" element={< Logout/>} />
      <Route path="/milestone" element={<Milestone />} />
    
      <Route path="/analytics" element={<Analytics />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/mypage-detail" element={<MyPageDetail />} />
      <Route path="/job-links" element={<JobLinks />} />
      <Route path="/diagnosis" element={<Diagnosis />} />
      <Route path="/activities" element={<Activities />} />
      <Route path="/dictionary" element={<CareerDictionary />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/grade" element={<Grade />} />
      
      
     
    </Routes>
  );
}

export default App;
