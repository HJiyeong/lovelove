import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

function Chat() {
  /* 🌱 세션 ID */
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);   // 지난 대화 목록


  /* 🗨️ 메시지 */
  const [messages, setMessages] = useState([]);

  /* UI */
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  /* 🔚 자동 스크롤 */
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollRef = useRef(null);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);


  /* ▶ 새 세션 생성 */
  useEffect(() => {
    const init = async () => {
      const { data } = await axios.post("/api/chat/sessions");
      setSessionId(data.sessionId);
    };
    init();
  }, []);



  /* 📥 이전 기록 */
  useEffect(() => {
    if (!sessionId) return;
    const fetchHistory = async () => {
      const { data } = await axios.get("/api/chat/messages", {
        params: { sessionId },
      });
      setMessages(
          data.map((m) => ({
            type: m.role === "user" ? "user" : "bot", // ✅ 여기!
            text: m.message,
          }))
      );
    };
    fetchHistory();
  }, [sessionId]);

  // 세션 목록 가져오기
  const fetchSessions = async () => {
    const { data } = await axios.get("/api/chat/sessions");
    setSessions(data);
  };

// 사이드바에서 세션 클릭 시 전환
  const switchSession = (sid) => {
    if (sid === sessionId) return;   // 이미 열려 있으면 무시
    setSessionId(sid);
    setMessages([]);                 // 히스토리 useEffect가 곧 채워줌
    setShowHistory(false);           // 사이드바 닫기
  };


  /* ✉️ 전송 */
  const handleSend = async () => {
    if (!input.trim() || !sessionId) return;
    const userMsg = { type: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const { data: aiMsg } = await axios.post(
        "/api/chat/send",
        { message: input },
        { params: { sessionId } }
    );

    setMessages((prev) => [...prev, { type: "bot", text: aiMsg.message }]);
    setIsTyping(false);
    fetchSessions();   // 메시지 전송·새 상담 후 목록 새로고침

  };

  /* ♻ 새 상담 */
  const handleReset = async () => {
    if (sessionId) await axios.delete(`/api/chat/sessions/${sessionId}`);
    setMessages([]);
    setMessages([]);
    const { data } = await axios.post("/api/chat/sessions");
    setSessionId(data.sessionId);
    fetchSessions();   // 메시지 전송·새 상담 후 목록 새로고침

  };

  return (
      <div className="flex min-h-screen bg-gradient-to-br from-pink-100 to-rose-200 font-sans relative">
        {/* 💬 히스토리 사이드바 */}
        {showHistory && (
            <div className="absolute top-0 left-64 w-64 h-full bg-white z-40 shadow-xl border-r border-gray-200 p-4 space-y-4 transition-all">
              <h2 className="text-lg font-bold text-rose-700">📁 지난 대화</h2>
              {/* TODO: 세션 목록 API 연결 후 교체 */}
              {sessions.map(({ sessionId: sid, preview, updated }) => (
                  <div
                      key={sid}
                      onClick={() => switchSession(sid)}
                      className={`p-3 rounded-lg cursor-pointer text-sm
                ${sid === sessionId ? "bg-pink-100" : "hover:bg-pink-50"}`}
                  >
                    <p className="font-medium truncate">{preview}</p>
                    <p className="text-[11px] text-gray-400">{updated}</p>
                  </div>
              ))}
              {sessions.length === 0 && (
                  <p className="text-xs text-gray-400 mt-4">저장된 대화가 없습니다.</p>
              )}

            </div>
        )}


        {/* 💬 메인 채팅 영역 */}
        <main
            className={`flex-1 flex flex-col transition-all duration-300 ${
                showHistory ? "ml-64" : ""
            }`}
        >
          {/* 상단 바 */}
          <div className="h-14 bg-white z-50 border-b border-gray-200 px-6 flex items-center justify-between shadow sticky top-0">
            <button
                onClick={() => setShowHistory(!showHistory)}
                className="text-sm bg-pink-100 hover:bg-[#fff3ed] text-pink-700 font-semibold px-3 py-1 rounded-full"
            >
              채팅 기록
            </button>
            <h1 className="text-lg font-bold text-pink-700">AI 진로 상담 커비</h1>
            <button
                onClick={handleReset}
                className="text-sm bg-pink-100 hover:bg-[#fff3ed] text-pink-700 font-semibold px-3 py-1 rounded-full"
            >
              + 새 상담
            </button>
          </div>

          {/* 메시지 영역 */}
          <div className="flex justify-center flex-1 px-6 py-6">
            {/* ✅ overflow-y-auto & scroll anchor */}
            <div
                ref={scrollRef}
                className="w-full max-w-3xl flex flex-col gap-4 overflow-y-auto pr-1 pb-40"
            >
              {messages.map((msg, idx) => (
                  <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-start gap-3 ${
                          msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                  >
                    {msg.type === "bot" && (
                        <img
                            src="/img_3.png"
                            alt="커비"
                            className="w-11 h-11 rounded-full border shadow"
                        />
                    )}
                    <div
                        className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line leading-relaxed ${
                            msg.type === "bot"
                                ? "bg-white text-gray-800 rounded-bl-none"
                                : "bg-pink-600 text-black rounded-br-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
              ))}

              {isTyping && (
                  <div className="text-sm text-gray-400 italic ml-4">큐비가 입력 중...</div>
              )}

              {/* 🔚 스크롤 앵커 */}
              <div ref={endRef} />
            </div>
          </div>

          {/* 입력창 */}
          <div className="fixed bottom-0 left-64 right-0 flex justify-center bg-white/70 backdrop-blur-md z-50 border-t">
            <div
                className={`w-full max-w-3xl flex items-center gap-2 p-4 transition-all duration-300 ${
                    showHistory ? "ml-64" : ""
                }`}
            >
              <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none bg-white/80"
                  placeholder="메시지를 입력하세요..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
              />
              <button
                  onClick={handleSend}
                  className="bg-pink-600 hover:bg-pink-700 text-black px-6 py-2 rounded-full font-semibold transition"
              >
                ➤
              </button>
            </div>
          </div>
        </main>
      </div>
  );
}

export default Chat;
