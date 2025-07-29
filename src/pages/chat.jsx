import React, { useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([
    { type: "bot", text: "안녕하세요! 어떤 진로에 관심이 있으신가요?" },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const userMessage = { type: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // TODO: GPT API 연동할 부분
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { type: "bot", text: "좋은 질문이에요! 곧 답변을 드릴게요 :)" },
      ]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 flex flex-col">
      <div className="text-2xl font-bold text-center text-purple-700 py-6">AI 진로 상담</div>

      <div className="flex-1 px-4 overflow-y-auto space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`max-w-[75%] px-4 py-2 rounded-2xl shadow text-sm whitespace-pre-line ${
              msg.type === "bot"
                ? "bg-white text-left text-gray-700 self-start"
                : "bg-purple-500 text-black self-end ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div className="border-t bg-white p-4 flex gap-2">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm outline-none"
          placeholder="메시지를 입력하세요..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-purple-500 text-black px-4 py-2 rounded-full font-semibold hover:bg-purple-600"
        >
          전송
        </button>
      </div>
    </div>
  );
}

export default Chat;
