import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "" });
  const [modalOpen, setModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("/api/calendar");
      const formatted = res.data.map((event) => ({
        id: event.id,
        title: event.title,
        date: event.date,
        backgroundColor: "#a78bfa",
        borderColor: "#7c3aed",
        textColor: "white",
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("이벤트 불러오기 실패 ❌", err);
    }
  };

  const handleDateClick = (info) => {
    setNewEvent({ date: info.dateStr, title: "" });
    setModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (!newEvent.date || !newEvent.title) return;
    try {
      await axios.post("/api/calendar", newEvent);
      setNewEvent({ date: "", title: "" });
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("이벤트 추가 실패 ❌", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/calendar/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("이벤트 삭제 실패 ❌", err);
    }
  };

  const filteredEvents = events.filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <div className="flex min-h-screen font-sans">
        {/* 🟣 사이드바 */}
        <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#ffeded] to-white text-black flex flex-col justify-between p-6 rounded-tr-3xl rounded-br-3xl">
          <div>
            <div className="p-3 mb-10 flex items-start justify-start pl-0">
              <img src="/img_5.png" alt="CareerNavi Logo" className="h-15 object-contain" />
            </div>
            <nav className="flex flex-col gap-3">
              {[
                "메인",
                "전공 검색",
                "진로 백과사전",
                "진로 캘린더",
                "설정",
                "로그아웃",
              ].map((label, idx) => (
                  <Link
                      key={idx}
                      to={["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx]}
                      className="rounded-xl px-4 py-2 text-left hover:bg-white/10 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                  >
                    {label}
                  </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* 📅 메인 콘텐츠 */}
        <div className="flex-1 relative bg-gradient-to-br from-indigo-50 to-purple-100 pt-24 px-6 pb-10">
          {/* 상단 고정 바 */}
          <header
              className="
    fixed top-0 left-64 right-0
    h-16 px-8
    grid grid-cols-[auto_1fr_auto] items-center
    bg-white/60 backdrop-blur-lg
    border-b border-white/20 shadow-[0_2px_8px_rgba(0,0,0,0.06)]
    rounded-bl-2xl z-50
  "
          >
            <h1 className="text-xl font-bold text-purple-600 whitespace-nowrap">
              진로&nbsp;캘린더
            </h1>

            <nav className="flex items-center gap-6 text-sm font-medium justify-self-end">
              {[
                ["적성검사", "/test"],
                ["커리어&nbsp;백과사전", "/dateplace"],
                ["마일스톤", "/milestone"],
              ].map(([label, path]) => (
                  <Link
                      key={label}
                      to={path}
                      className="relative text-gray-600 hover:text-purple-600 transition group"
                      dangerouslySetInnerHTML={{ __html: label }}
                  />
              ))}

              <Link
                  to="/chat"
                  aria-label="AI커비와 상담하기"
                  className="
        px-4 py-2 rounded-full
        bg-purple-600 text-black
        shadow hover:bg-purple-700
        hover:-translate-y-0.5 active:translate-y-0
        transition transform whitespace-nowrap
      "
              >
                💬 AI커비와&nbsp;상담하기
              </Link>
            </nav>
          </header>

          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-purple-700 mb-6">🧭 진로 여정, 달력으로 관리하기</h1>
            <p className="text-gray-600 mb-8">진로 관련 일정을 등록하고 관리할 수 있어요.</p>

            {/* 일정 추가 */}
            <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">+ 새로운 일정 추가</h2>
              <div className="flex flex-col gap-4 md:flex-row md:items-center">
                <input
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
                />
                <input
                    type="text"
                    placeholder="일정 제목"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                    className="border border-gray-300 rounded-md px-4 py-2 w-full md:flex-1"
                />
                <button
                    onClick={handleAddEvent}
                    className="bg-purple-600 text-black px-6 py-2 rounded-md hover:bg-purple-700 transition"
                >
                  추가하기
                </button>
              </div>
            </div>

            {/* 일정 리스트 */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 등록된 일정</h2>
              {events.length === 0 ? (
                  <p className="text-gray-500">등록된 일정이 없습니다.</p>
              ) : (
                  <ul className="space-y-3">
                    {events.map((event) => (
                        <li
                            key={event.id}
                            className="flex justify-between items-center border-b pb-2 text-gray-700"
                        >
                          <div>
                            <span className="mr-4">{event.date}</span>
                            <span className="font-medium">{event.title}</span>
                          </div>
                          <button
                              onClick={() => handleDeleteEvent(event.id)}
                              className="text-red-500 hover:underline text-sm"
                          >
                            삭제
                          </button>
                        </li>
                    ))}
                  </ul>
              )}
            </div>

            {/* 캘린더 */}
            <div className="bg-white p-6 rounded-xl shadow">
              <input
                  type="text"
                  placeholder="일정 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-md px-4 py-2 mb-4 w-full max-w-xs"
              />
              <FullCalendar
                  plugins={[dayGridPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  locale="ko"
                  height="auto"
                  headerToolbar={{
                    start: "prev,next today",
                    center: "title",
                    end: "dayGridMonth"
                  }}
                  events={filteredEvents}
                  dateClick={handleDateClick}
                  eventClick={(info) => {
                    const confirmDelete = window.confirm(`\"${info.event.title}\" 일정을 삭제할까요?`);
                    if (confirmDelete) {
                      handleDeleteEvent(info.event.id);
                    }
                  }}
              />
            </div>
          </div>

          {/* 일정 추가 모달 */}
          {modalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
                <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
                  <h2 className="text-xl font-bold text-purple-700 mb-4">새 일정 추가</h2>
                  <input
                      type="text"
                      placeholder="일정 제목"
                      value={newEvent.title}
                      onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setModalOpen(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                    >
                      취소
                    </button>
                    <button
                        onClick={handleAddEvent}
                        className="bg-purple-600 text-black px-4 py-2 rounded-md hover:bg-purple-700"
                    >
                      추가하기
                    </button>
                  </div>
                </div>
              </div>
          )}
        </div>
      </div>
  );
}

export default CalendarPage;
