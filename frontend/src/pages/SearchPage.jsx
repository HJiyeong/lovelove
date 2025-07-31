import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar2 from "../components/Topbar2";

function SearchPage() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [platformFilter, setPlatformFilter] = useState("전체");
  const [topicFilter, setTopicFilter] = useState("전체");

  useEffect(() => {
    fetch(`http://localhost:8080/romance-advice?search=${searchTerm}&platform=${platformFilter === "전체" ? "" : platformFilter}&tag=${topicFilter === "전체" ? "" : topicFilter}`)

    .then((res) => res.json())
        .then((jsonData) => {
          console.log("백엔드 응답:", jsonData); // 🔍 여기에 출력
          setData(jsonData);
        });
    }, [searchTerm, platformFilter, topicFilter]);
  return (
    <div className="flex min-h-screen font-sans">
      {/* Sidebar */}

      {/* Main Content */}
      <main className="flex-1 relative bg-gradient-to-br from-pink-50 to-rose-100 pt-24 px-32 pb-10">
        {/* Topbar */}
        <Topbar2 />
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">
          💗{" "}
          <span className="bg-gradient-to-r from-[#e057a5] to-[#b05a57] text-transparent bg-clip-text">
            연애 조언 컨텐츠 검색
          </span>
        </h1>
          <p className="text-gray-600 mb-6">썸, 연애, 이별 등 키워드로 검색하고, 플랫폼과 주제로 필터링해보세요.</p>

          {/* 검색창 + 필터 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="예: 썸, 고백, 이별"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 rounded-xl shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="p-3 rounded-xl shadow border border-gray-200"
            >
              {["전체", "YouTube", "블로그"].map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
            <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="p-3 rounded-xl shadow border border-gray-200"
          >
            {["전체", "썸타는법", "연애하는법", "고백하는법", "이별을 대처하는 자세", "권태기극복법"].map((t, idx) => (
              <option key={idx} value={t}>{t}</option>
            ))}
          </select>

          </div>

          {/* 결과 리스트 */}
          <div className="space-y-6 max-h-[65vh] overflow-auto pr-2">
            {data.length > 0 ? (
              data.map((item, idx) => (
                <a
                  key={idx}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white border border-pink-100 rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
                >
                  <div className="flex gap-4">
                    <img
                      src={item.thumbnail || '/fallback.png'}
                      alt="thumbnail"
                      className="w-24 h-24 rounded-lg object-cover flex-shrink-0"
                    />
                    <div>
                      <h3 className="text-lg font-bold text-[#d66d69]">{item.title}</h3>
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">{item.description}</p>
                      <p className="text-xs text-gray-500 mt-2">출처: {item.platform}</p>
                      <div className="mt-1 flex gap-2 flex-wrap">
                        {item.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 bg-white border border-gray-200 text-gray-500 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
