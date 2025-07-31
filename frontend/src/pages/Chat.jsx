import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Plus, Send, History } from "lucide-react";

export default function Chat() {
  const [sessionId, setSessionId] = useState(null);
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const scrollRef = useRef(null);
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages]);
  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.post("/api/chat/sessions");
      setSessionId(data.sessionId);
      fetchSessions();
    };
    init();
  }, []);

  useEffect(() => {
    if (!sessionId) return;
    (async () => {
      const { data } = await axios.get("/api/chat/messages", { params: { sessionId } });
      setMessages(
        data.map((m) => ({ type: m.role === "user" ? "user" : "bot", text: m.message }))
      );
    })();
  }, [sessionId]);

  const fetchSessions = async () => {
    const { data } = await axios.get("/api/chat/sessions");
    setSessions(data);
  };

  const switchSession = (sid) => {
    if (sid === sessionId) return;
    setSessionId(sid);
    setMessages([]);
    setShowHistory(false); // ✅ 사이드바 닫기
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { type: "user", text: input };
    setMessages((p) => [...p, userMsg]);
    setInput("");
    setIsTyping(true);

    const { data: aiMsg } = await axios.post(
      "/api/chat/send",
      { message: userMsg.text },
      { params: { sessionId } }
    );

    setMessages((p) => [...p, { type: "bot", text: aiMsg.message }]);
    setIsTyping(false);
    fetchSessions();
  };

  const handleReset = async () => {
    if (sessionId) await axios.delete(`/api/chat/sessions/${sessionId}`);
    setMessages([]);
    const { data } = await axios.post("/api/chat/sessions");
    setSessionId(data.sessionId);
    fetchSessions();
  };

  const Bubble = ({ msg }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
    >
      {msg.type === "bot" && (
        <img src="/img_3.png" alt="bot" className="w-9 h-9 rounded-full mr-2 shadow" />
      )}
      <div
        className={`relative max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed shadow-lg whitespace-pre-wrap backdrop-blur-sm ${
          msg.type === "bot"
            ? "bg-white/80 text-gray-800 rounded-bl-none"
            : "bg-gradient-to-r from-rose-500 to-pink-400 text-white rounded-br-none"
        }`}
      >
        {msg.text}
      </div>
    </motion.div>
  );

  return (
    <div className="relative min-h-screen flex overflow-hidden bg-gradient-to-br from-rose-50 via-indigo-50 to-emerald-50 font-sans">
      {/* Sidebar */}
      <AnimatePresence>
        {showHistory && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 90 }}
            className="fixed left-64 top-0 w-64 h-full bg-white/70 backdrop-blur-lg border-r border-gray-200 shadow-xl z-40 p-6 flex flex-col gap-4"
          >
            <h3 className="flex items-center gap-2 text-rose-600 font-bold mb-2">
              <History className="w-5 h-5" /> 대화 기록
            </h3>
            <div className="flex-1 overflow-y-auto pr-1 space-y-3">
              {sessions.map(({ sessionId: sid, preview, updated }) => (
                <button
                  key={sid}
                  onClick={() => switchSession(sid)}
                  className={`w-full text-left p-3 rounded-xl transition ${
                    sid === sessionId ? "bg-rose-100/80" : "hover:bg-gray-50"
                  }`}
                >
                  <p className="font-medium truncate mb-1 text-sm">{preview}</p>
                  <p className="text-[11px] text-gray-400">{updated}</p>
                </button>
              ))}
              {sessions.length === 0 && (
                <p className="text-xs text-gray-400">저장된 대화가 없습니다.</p>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Chat Area */}
      <div className={`flex flex-col flex-1 transition-all duration-300 ${showHistory ? "ml-64" : ""}`}>
        {/* Top Bar */}
        <div className="h-14 sticky top-0 bg-white/70 backdrop-blur-lg border-b border-gray-200 flex items-center justify-between px-6 z-30 shadow-sm">
          <button onClick={() => setShowHistory(!showHistory)} className="icon-btn">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-pink-700 text-lg">AI 진로 상담 큐비</h1>
          <button onClick={handleReset} className="icon-btn">
            <Plus className="w-5 h-5" /> 새 상담
          </button>
        </div>

        {/* Message List */}
        <div className="flex-1 flex justify-center px-4 lg:px-8 py-6 overflow-y-auto" ref={scrollRef}>
          <div className="w-full max-w-2xl flex flex-col gap-4">
            {messages.map((m, i) => (
              <Bubble key={i} msg={m} />
            ))}
            {isTyping && <p className="text-xs text-gray-400 ml-2">큐비가 입력 중…</p>}
            <div ref={endRef} />
          </div>
        </div>

        {/* Input Bar */}
        <div className="sticky bottom-0 bg-white/80 backdrop-blur-lg border-t border-gray-200 flex justify-center z-20 px-4 py-3">
          <div className="w-full max-w-2xl flex items-center gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="메시지를 입력하세요…"
              className="flex-1 bg-white/90 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-300 shadow-inner"
            />
            <button
              onClick={handleSend}
              className="bg-gradient-to-r from-pink-500 to-fuchsia-500 hover:to-fuchsia-600 text-white p-3 rounded-full shadow-lg active:scale-95 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
