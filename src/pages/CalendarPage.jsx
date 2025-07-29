import React, { useState, useEffect } from "react";
import axios from "axios";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ date: "", title: "" });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/events");
      setEvents(res.data);
    } catch (err) {
      console.error("이벤트 불러오기 실패", err);
    }
  };

  const handleAddEvent = async () => {
    if (newEvent.date && newEvent.title) {
      try {
        await axios.post("http://localhost:5000/events", newEvent);
        setNewEvent({ date: "", title: "" });
        fetchEvents();
      } catch (err) {
        console.error("이벤트 추가 실패", err);
      }
    }
  };

  const handleDeleteEvent = async (index) => {
    try {
      await axios.delete(`http://localhost:5000/events/${index}`);
      fetchEvents();
    } catch (err) {
      console.error("이벤트 삭제 실패", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 px-6 py-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">📅 진로 캘린더</h1>
        <p className="text-gray-600 mb-8">진로 관련 일정을 등록하고 관리할 수 있어요.</p>

        {/* 일정 추가 입력창 */}
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
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 등록된 일정</h2>
          {events.length === 0 ? (
            <p className="text-gray-500">등록된 일정이 없습니다.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((event, idx) => (
                <li
                  key={idx}
                  className="flex justify-between items-center border-b pb-2 text-gray-700"
                >
                  <div>
                    <span className="mr-4">{event.date}</span>
                    <span className="font-medium">{event.title}</span>
                  </div>
                  <button
                    onClick={() => handleDeleteEvent(idx)}
                    className="text-red-500 hover:underline text-sm"
                  >
                    삭제
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarPage;
