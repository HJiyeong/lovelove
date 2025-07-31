import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

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
        backgroundColor: "#f472b6",
        borderColor: "#db2777",
        textColor: "white",
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("기록 불러오기 실패 ❌", err);
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
      console.error("기록 추가 실패 ❌", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/calendar/${id}`);
      fetchEvents();
    } catch (err) {
      console.error("기록 삭제 실패 ❌", err);
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-sans">
      {/* 사이드바 */}
      <Sidebar />

      {/* 📅 메인 콘텐츠 */}
      <div className="flex-1 relative bg-gradient-to-br from-pink-50 to-rose-100 pt-24 px-6 pb-10">
        {/* 상단 바 */}
        <Topbar/>
        

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-rose-600 mb-6">💗 나의 연애/썸 기록, 다이어리로 남기기</h1>
          <p className="text-gray-600 mb-8">
            설레는 순간, 썸의 시작, 연애의 기록을 달력에 남겨보세요.
          </p>

          {/* 기록 추가 */}
          <div className="bg-white p-6 rounded-xl shadow mb-8 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">+ 새로운 기록 추가</h2>
            <div className="flex flex-col gap-4 md:flex-row md:items-center">
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full md:w-1/3"
              />
              <input
                type="text"
                placeholder="오늘의 설레는 순간은?"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full md:flex-1"
              />
              <button
                onClick={handleAddEvent}
                className="bg-rose-500 text-white px-6 py-2 rounded-md hover:bg-rose-600 transition"
              >
                추가하기
              </button>
            </div>
          </div>

          {/* 기록 리스트 */}
          <div className="bg-white p-6 rounded-xl shadow mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 지금까지의 기록들</h2>
            {events.length === 0 ? (
              <p className="text-gray-500">아직 등록된 연애 기록이 없어요.</p>
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
              placeholder="기록 검색 (ex. 고백, 데이트, 첫 만남...)"
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
                end: "dayGridMonth",
              }}
              events={filteredEvents}
              dateClick={handleDateClick}
              eventClick={(info) => {
                const confirmDelete = window.confirm(`"${info.event.title}" 기록을 삭제할까요?`);
                if (confirmDelete) {
                  handleDeleteEvent(info.event.id);
                }
              }}
            />
          </div>
        </div>

        {/* 기록 추가 모달 */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold text-rose-600 mb-4">새로운 연애 기록</h2>
              <input
                type="text"
                placeholder="예: 처음 만난 날, 카페 데이트 등"
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
                  className="bg-rose-500 text-white px-4 py-2 rounded-md hover:bg-rose-600"
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
