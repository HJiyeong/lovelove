import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import placesData from "../data/all_places_naver_api.json";
import { LoadScript, GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";





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

const center = {
  lat: 37.5665,
  lng: 126.978,
};


function convertTMtoLatLng(x, y) {
  const RE = 6371.00877; // 지구 반경(km)
  const GRID = 5.0; // 격자 간격 (km)
  const SLAT1 = 30.0; // 투영 위도1(degree)
  const SLAT2 = 60.0; // 투영 위도2(degree)
  const OLON = 126.0; // 기준점 경도(degree)
  const OLAT = 38.0; // 기준점 위도(degree)
  const XO = 43; // 기준점 X좌표(GRID)
  const YO = 136; // 기준점 Y좌표(GRID)

  const DEGRAD = Math.PI / 180.0;
  const RADDEG = 180.0 / Math.PI;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  const xn = x - XO;
  const yn = ro - y + YO;

  let ra = Math.sqrt(xn * xn + yn * yn);
  let alat = Math.pow((re * sf) / ra, 1.0 / sn);
  alat = 2.0 * Math.atan(alat) - Math.PI * 0.5;

  let theta = 0.0;
  if (Math.abs(xn) <= 0.0) theta = 0.0;
  else if (Math.abs(yn) <= 0.0) theta = Math.PI * 0.5;
  else theta = Math.atan2(xn, yn);

  let alon = theta / sn + olon;

  return {
    lat: alat * RADDEG,
    lng: alon * RADDEG,
  };
}


function Dateplace() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedKeyword, setSelectedKeyword] = useState("");
  const [activeMarker, setActiveMarker] = useState(null);

  const districtsForCity = selectedCity
    ? REGION_LIST.find((r) => r.city === selectedCity)?.districts || []
    : [];

  useEffect(() => {
    setData(placesData);
  }, []);

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
        <div className="w-3/5">
          <h1 className="text-3xl font-bold text-pink-600 mb-6">💗 데이트 장소 검색</h1>

          <div className="flex flex-wrap gap-4 mb-6">
            <input
              type="text"
              placeholder="검색어 입력 (예: 홍대 카페)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 p-3 rounded-xl shadow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            />

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
                    <div>
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
          <LoadScript googleMapsApiKey={"AIzaSyC8fdcd_-n3LoGfb1l5AUj0X8W6I2L2G18"}>
             <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
      {filteredData.map((place, idx) => {
        const { lat, lng } = convertTMtoLatLng(Number(place.mapx), Number(place.mapy));
        return (
          <Marker
            key={idx}
            position={{ lat, lng }}
            onClick={() => setActiveMarker(idx)}
          >
            {activeMarker === idx && (
              <InfoWindow onCloseClick={() => setActiveMarker(null)} position={{ lat, lng }}>
                <div>
                  <strong dangerouslySetInnerHTML={{ __html: place.name }} />
                  <p>{place.address || place.roadAddress || "주소 없음"}</p>
                </div>
              </InfoWindow>
            )}
          </Marker>
        );
      })}
    </GoogleMap>
          </LoadScript>
        </div>
      </main>
    </div>
  );
}

export default Dateplace;