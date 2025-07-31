import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import placesData from "../data/date_places.json";
import { GoogleMap, Marker, OverlayView } from "@react-google-maps/api";
import Sidebar from "../components/Sidebar";
import Topbar3 from "../components/Topbar3";


const SEARCH_KEYWORD_FILTERS = [
  "데이트 카페",
  "데이트 맛집",
  "분위기 좋은 술집",
  "분위기 좋은 칵테일바",
];

const REGION_LIST = [
  { city: "서울", districts: ["홍대", "연남", "성수", "강남", "잠실", "종로", "한남"] },
  { city: "부산", districts: ["해운대", "서면", "남포동"] },
  { city: "대전", districts: ["둔산동", "유성구"] },
  { city: "광주", districts: ["상무지구", "충장로"] },
  { city: "대구", districts: ["동성로"] },
  { city: "울산", districts: ["삼산동", "성남동"] },
  { city: "경기", districts: ["수원", "일산", "분당", "의정부", "부천"] },
  { city: "인천", districts: ["송도", "구월동", "연수동"] },
  { city: "강원", districts: ["강릉", "속초", "춘천"] },
  { city: "제주", districts: ["제주시", "서귀포시"] },
];

const mapContainerStyle = {
  width: "40vw",
  height: "70vh",
  minWidth: "300px",
};

const initialCenter = {
  lat: 36.5,
  lng: 127.8,
};

function getMarkerColor(category) {
  if (category.includes("카페")) return "http://maps.google.com/mapfiles/ms/icons/pink-dot.png";
  if (category.includes("맛집")) return "http://maps.google.com/mapfiles/ms/icons/orange-dot.png";
  if (category.includes("술집")) return "http://maps.google.com/mapfiles/ms/icons/purple-dot.png";
  if (category.includes("칵테일")) return "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
  return "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
}

// 지도 중심으로 확대되게 하기 위해
function calculateMapCenter(markers) {
  if (markers.length === 0) return null;
  const latSum = markers.reduce((sum, m) => sum + m.position.lat, 0);
  const lngSum = markers.reduce((sum, m) => sum + m.position.lng, 0);
  return {
    lat: latSum / markers.length,
    lng: lngSum / markers.length,
  };
}


function Dateplace() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    setData(placesData);
  }, []);


  const districtsForCity = selectedCity
    ? REGION_LIST.find((r) => r.city === selectedCity)?.districts || []
    : [];

  const filteredData = data.filter((item) => {
    const matchesSearch = item.name
      .replace(/<[^>]*>?/gm, "")
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity ? item.city === selectedCity : true;
    const matchesDistrict = selectedDistrict ? item.district === selectedDistrict : true;
    const matchesKeyword = selectedKeyword
      ? item.search_keyword.includes(selectedKeyword)
      : true;
    return matchesSearch && matchesCity && matchesDistrict && matchesKeyword;
  });

  const markers = useMemo(() => {
    return filteredData.map((place, idx) => {
      const lat = Number(place.mapy) / 1e7;
      const lng = Number(place.mapx) / 1e7;
      if (isNaN(lat) || isNaN(lng)) return null;
      return {
        position: { lat, lng },
        category: place.category,
        name: place.name,
        address: place.address || place.roadAddress || "주소 없음",
        image: place.image,
        id: idx,
        raw: place,
      };
    }).filter(Boolean);
  }, [filteredData]);

  useEffect(() => {
  if (!selectedCity) return; 
  if (mapRef.current && markers.length > 0) {
    const center = calculateMapCenter(markers);
    if (center) {
      mapRef.current.panTo(center);
      mapRef.current.setZoom(selectedDistrict ? 15 : 11);
    }
  }
}, [selectedCity, selectedDistrict, markers]);

  return (
    <div className="flex min-h-screen bg-[#f9fafb] font-sans">
      {/* 사이드바 */}

      <main className="flex-1 bg-gradient-to-br from-pink-50 to-rose-100 px-20 py-5 overflow-auto flex gap-6 relative items-start">
        
      <Topbar3 />

        <div className="w-3/5 mt-8"> {/* ← 여백 조절 */}
          <h1 className="text-3xl font-bold mb-4 mt-10">
          💗{" "}
          <span className="bg-gradient-to-r from-[#e057a5] to-[#b05a57] text-transparent bg-clip-text">
            데이트 장소 검색
          </span>
        </h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedDistrict("");
              }}
              className="p-3 rounded-xl shadow border border-gray-300"
            >
              <option value="">전체 도시</option>
              {REGION_LIST.map((r) => (
                <option key={r.city} value={r.city}>
                  {r.city}
                </option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedCity}
              className="p-3 rounded-xl shadow border border-gray-300"
            >
              <option value="">전체 지역</option>
              {districtsForCity.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <select
              value={selectedKeyword}
              onChange={(e) => setSelectedKeyword(e.target.value)}
              className="p-3 rounded-xl shadow border border-gray-300"
            >
              <option value="">전체 키워드</option>
              {SEARCH_KEYWORD_FILTERS.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6 max-h-[70vh] overflow-auto">
            {filteredData.length > 0 ? (
              filteredData.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-white border border-pink-100 rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
                >
                  <div className="flex gap-4">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
                      />
                    )}
                    <div className="flex flex-col justify-between">
                      <h3
                        className="text-lg font-bold text-[#d66d69]"
                        dangerouslySetInnerHTML={{ __html: item.name }}
                      />
                      <p className="text-sm text-gray-700 mt-1 line-clamp-2">
                        {item.description || item.address || item.roadAddress || "상세정보 없음"}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">{item.search_keyword || "없음"}</p>
                      {item.phone && (
                        <p className="text-xs text-gray-500 mt-1">전화번호: {item.phone}</p>
                      )}
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <p className="text-gray-500 text-center">검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

      <div className="relative top-[110px] w-[360px] h-[600px] shrink-0 "  >
        {/* 📱 휴대폰 이미지 */}
        <img
          src="/phone.png"
          alt="phone frame"
          className="w-full h-full absolute z-20 pointer-events-none"
        />

  {/* 📍 지도 위치 조절 */}
   <div className="absolute top-[100px] left-[55px] right-[0px] bottom-[100px]">
    {/* 🗺️ 지도 자체 */}
    <GoogleMap
      mapContainerStyle={{ width: "80%", height: "90%" }}
      center={initialCenter}
      zoom={5.5}
      onLoad={(map) => (mapRef.current = map)}
       onClick={() => setActiveMarker(null)}// 지도 클릭시 닫힘
    >
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={m.position}
          icon={{
            url: getMarkerColor(m.category || ""),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
          onClick={() => {
            setActiveMarker(m.id);
            mapRef.current?.panTo(m.position);
          }}
        >
          {activeMarker === m.id && (
<OverlayView
  position={m.position}
  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
>
  <div
    style={{
      width: "100px",
      maxWidth: "90vw",
      display: "flex",
      flexDirection: "column",
      background: "white",
      padding: "8px",
      borderRadius: "8px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      fontSize: "12px",
      color: "#a88884",
      lineHeight: "1.4",
      whiteSpace: "normal",
      wordBreak: "break-word",
    }}
  >
    {m.image && (
      <img
        src={m.image}
        alt={m.name}
        style={{
          width: "100%",
          height: "80px",
          objectFit: "cover",
          borderRadius: "6px",
          marginBottom: "6px",
        }}
      />
    )}
    <strong
      style={{
        display: "block",
        marginBottom: "4px",
      }}
      dangerouslySetInnerHTML={{ __html: m.name }}
    />
    <p>{m.address}</p>

    {/* ✅ 링크 버튼처럼 분리 */}
    {m.raw?.link && (
      <a
        href={m.raw.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          marginTop: "6px",
          fontSize: "11px",
          color: "#b05a57",
          textDecoration: "underline",
          alignSelf: "flex-end",
        }}
      >
        자세히 보기 ↗
      </a>
    )}
  </div>
</OverlayView>

)}

        </Marker>
      ))}
    </GoogleMap>

    {/* 📌 마커 범례 */}
    <div className="absolute top-2 right-15 bg-white bg-opacity-90 shadow-lg rounded-xl p-2 text-[11px] z-10 space-y-1">
      <div className="flex items-center gap-1">
        <img src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png" className="w-3 h-3" />
        <span>카페</span>
      </div>
      <div className="flex items-center gap-1">
        <img src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png" className="w-3 h-3" />
        <span>맛집</span>
      </div>
      <div className="flex items-center gap-1">
        <img src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png" className="w-3 h-3" />
        <span>술집</span>
      </div>
      <div className="flex items-center gap-1">
        <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" className="w-3 h-3" />
        <span>칵테일바</span>
      </div>
    </div>
  </div>
</div>

      </main>
    </div>
  );
}

export default Dateplace;
