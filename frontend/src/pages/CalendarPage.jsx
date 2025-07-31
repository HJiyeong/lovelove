import React, { useState, useEffect } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    date: "",
    title: "",
    description: "",
    image: null,
    imagePreviewUrl: null,
    id: null,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
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
        backgroundColor: "#d66d69",
        borderColor: "white",
        textColor: "white",
      }));
      setEvents(formatted);
    } catch (err) {
      console.error("기록 불러오기 실패 ❌", err);
    }
  };

  const handleDateClick = (info) => {
    setNewEvent({
      date: info.dateStr,
      title: "",
      description: "",
      image: null,
      imagePreviewUrl: null,
      id: null,
    });
    setModalOpen(true);
  };

  const handleAddEvent = async () => {
    if (!newEvent.date || !newEvent.title) return;

    try {
      const formData = new FormData();
      formData.append("date", newEvent.date);
      formData.append("title", newEvent.title);
      formData.append("description", newEvent.description);
      if (newEvent.image) {
        formData.append("image", newEvent.image);
      }

      if (newEvent.id) {
        await axios.put(`/api/calendar/${newEvent.id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("/api/calendar", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      setNewEvent({
        date: "",
        title: "",
        description: "",
        image: null,
        imagePreviewUrl: null,
        id: null,
      });
      setModalOpen(false);
      fetchEvents();
    } catch (err) {
      console.error("기록 추가 실패 ❌", err);
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await axios.delete(`/api/calendar/${id}`);
      setSelectedEvent(null);
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
      <div className="flex-1 relative bg-gradient-to-br from-pink-50 to-rose-100 px-20 py-24 overflow-auto flex gap-6 ">
        <Topbar />

        {/* 메인 콘텐츠 */}
<div>
  <h1 className="text-3xl font-bold text-rose-600 mb-2">
    💗{" "}
          <span className="bg-gradient-to-r from-[#e057a5] to-[#b05a57] text-transparent bg-clip-text">
          나의 연애/썸 기록, 다이어리로 남기기
          </span>
  </h1>
  <p className="text-gray-600 mb-4">
    설레는 순간, 썸의 시작, 연애의 기록을 달력에 남겨보세요.
  </p>

  {/* 캘린더 + 기록 리스트 나란히 배치 */}
  <div className="flex flex-row gap-6 items-start">

    {/* 캘린더 */}
    <div className="bg-white p-6 rounded-xl shadow flex-1">

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
          axios.get(`/api/calendar`).then((res) => {
            const fullEvent = res.data.find((ev) => ev.id == info.event.id);
            setSelectedEvent(fullEvent);
          });
        }}
      />
    </div>

    {/* 기록 리스트 (오른쪽) */}
    <div className="bg-white p-6 rounded-xl shadow w-[300px] max-h-[600px] overflow-y-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">📌 지금까지의 기록들</h2>
      {events.length === 0 ? (
        <p className="text-gray-500">아직 등록된 연애 기록이 없어요.</p>
      ) : (
        <ul className="space-y-3">
          {events.map((event) => (
            <li
              key={event.id}
              className="flex justify-between items-center border-b pb-2 text-gray-700 cursor-pointer"
              onClick={() => {
                axios.get("/api/calendar").then((res) => {
                  const fullEvent = res.data.find((ev) => ev.id == event.id);
                  setSelectedEvent(fullEvent);
                });
              }}
            >
              <div>
                <span className="mr-4">{event.date}</span>
                <span className="font-medium">{event.title}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEvent(event.id);
                }}
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


         



        {/* 기록 추가/수정 모달 */}
        {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold text-[#d66d69] mb-4">
                {newEvent.id ? "기록 수정" : "새로운 연애 기록"}
              </h2>
              <input
                type="text"
                placeholder="제목 (예: 처음 만난 날)"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3"
              />
              <textarea
                placeholder="내용을 입력하세요..."
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-3 resize-none h-24"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  setNewEvent((prev) => ({
                    ...prev,
                    image: file,
                    imagePreviewUrl: file ? URL.createObjectURL(file) : null,
                  }));
                }}
                className="mb-4"
              />
              {newEvent.imagePreviewUrl && (
                <img
                  src={newEvent.imagePreviewUrl}
                  alt="선택한 이미지 미리보기"
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  취소
                </button>
                <button
                  onClick={handleAddEvent}
                  className="bg-[#d66d69] text-white px-4 py-2 rounded-md hover:bg-[#d66d69]"
                >
                  {newEvent.id ? "수정하기" : "추가하기"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 기록 상세 보기 모달 */}
        {selectedEvent && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
              <h2 className="text-xl font-bold text-[#d66d69] mb-2">{selectedEvent.title}</h2>
              <p className="text-gray-700 whitespace-pre-line mb-4">{selectedEvent.description}</p>
              {selectedEvent.imageUrl && (
                <img
                src={`http://localhost:8080${selectedEvent.imageUrl}`}
                alt="기록 이미지"
                className="w-full max-h-[50vh] object-contain rounded-md mb-4"
              />
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => {
                    setNewEvent({
                      date: selectedEvent.date,
                      title: selectedEvent.title,
                      description: selectedEvent.description,
                      image: null,
                      imagePreviewUrl: null,
                      id: selectedEvent.id,
                    });
                    setSelectedEvent(null);
                    setModalOpen(true);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500"
                >
                  수정
                </button>
                <button
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  삭제
                </button>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  닫기
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
