import React, { useState, useEffect, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import placesData from "../data/date_places.json";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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
  height: "80vh",
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

  const onMapLoad = (map) => {
    mapRef.current = map;
    const googleMarkers = markers.map((m) => {
      const marker = new window.google.maps.Marker({
        position: m.position,
        icon: {
          url: getMarkerColor(m.category || ""),
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });
      marker.addListener("click", () => {
        setActiveMarker(m.id);
        map.panTo(m.position);
      });
      return marker;
    });
    new MarkerClusterer({ markers: googleMarkers, map });
  };

  return (
    <div className="flex min-h-screen font-sans">
      <aside className="w-64 bg-gradient-to-b from-[#f7dee2] via-[#f1e0e2] to-[#ffeded] p-6 shadow-xl text-black flex flex-col justify-between rounded-tr-3xl rounded-br-3xl">
        <div>
          <div className="flex items-center gap-3">
            <img src="/img_5.png" alt="Logo" className="w-14 h-14 object-contain" />
            <h1 className="text-4xl font-extrabold bg-gradient-to-r from-[#e37571] to-[#b8baed] text-transparent bg-clip-text drop-shadow-md">
              꼬셔조
            </h1>
          </div>
          <nav className="flex flex-col gap-3 mt-6">
            {["메인", "연애 고수의 조언", "데이트 장소", "나의 다이어리", "설정", "로그아웃"].map(
              (label, idx) => (
                <Link
                  key={idx}
                  to={["/", "/search", "/dateplace", "/calendar", "/settings", "/logout"][idx]}
                  className="rounded-xl px-4 py-2 text-left hover:bg-white/40 transition cursor-pointer flex items-center gap-3 font-medium text-black"
                >
                  {label}
                </Link>
              )
            )}
          </nav>
        </div>
      </aside>

      <main className="flex-1 bg-white py-10 px-10 overflow-auto flex gap-6">
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-xl p-3 text-sm z-10 space-y-1">
          <div className="flex items-center gap-2">
            <img src="http://maps.google.com/mapfiles/ms/icons/pink-dot.png" className="w-4 h-4" />
            <span>카페</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="http://maps.google.com/mapfiles/ms/icons/orange-dot.png" className="w-4 h-4" />
            <span>맛집</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="http://maps.google.com/mapfiles/ms/icons/purple-dot.png" className="w-4 h-4" />
            <span>술집</span>
          </div>
          <div className="flex items-center gap-2">
            <img src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png" className="w-4 h-4" />
            <span>칵테일바</span>
          </div>
        </div>

        
        <div className="w-3/5">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">💗 데이트 장소 검색</h1>

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
                  className="block p-4 bg-pink-50 border border-pink-100 rounded-xl shadow hover:shadow-lg hover:scale-[1.01] transition"
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
                        className="text-lg font-bold text-pink-700"
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

        <div className="w-2/5 rounded-lg overflow-hidden shadow-lg">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={initialCenter}
            zoom={7}
            onLoad={onMapLoad}
          >
            {activeMarker !== null && (() => {
              const m = markers.find((m) => m.id === activeMarker);
              if (!m) return null;
              return (
                <InfoWindow position={m.position} onCloseClick={() => setActiveMarker(null)}>
                  <div style={{ maxWidth: "220px" }}>
                    {m.image && (
                      <img
                        src={m.image}
                        alt={m.name}
                        style={{ width: "100%", height: "120px", objectFit: "cover", borderRadius: "8px", marginBottom: "8px" }}
                      />
                    )}
                    <strong dangerouslySetInnerHTML={{ __html: m.name }} />
                    <p>{m.address}</p>
                  </div>
                </InfoWindow>
              );
            })()}
          </GoogleMap>
        </div>
      </main>
    </div>
  );
}

export default Dateplace;
