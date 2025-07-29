import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

import placesData from "../data/all_places_naver_api.json";

// Leaflet 기본 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

// TM128 → WGS84 변환 함수 (m 단위 입력, 내부에서 km로 변환)
function tm128ToWgs84(x, y) {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0 * (Math.PI / 180.0);
  const SLAT2 = 60.0 * (Math.PI / 180.0);
  const OLON = 126.0 * (Math.PI / 180.0);
  const OLAT = 38.0 * (Math.PI / 180.0);
  const XO = 43;
  const YO = 136;

  const re = RE / GRID;
  const sn =
    Math.log(Math.cos(SLAT1) / Math.cos(SLAT2)) /
    Math.log(
      Math.tan(Math.PI * 0.25 + SLAT2 * 0.5) /
        Math.tan(Math.PI * 0.25 + SLAT1 * 0.5)
    );
  const sf = (Math.tan(Math.PI * 0.25 + SLAT1 * 0.5) ** sn * Math.cos(SLAT1)) / sn;
  const ro = re * sf / (Math.tan(Math.PI * 0.25 + OLAT * 0.5) ** sn);

  // 좌표 m → km 단위 변환 후 공식 적용
  const xn = x / 1000 - XO;
  const yn = ro - y / 1000 + YO;

  const ra = Math.sqrt(xn * xn + yn * yn);
  const alat = 2.0 * Math.atan((re * sf / ra) ** (1.0 / sn)) - Math.PI * 0.5;

  let theta = 0;
  if (xn !== 0) {
    if (yn !== 0) {
      theta = Math.atan2(xn, yn);
    } else {
      theta = xn < 0 ? -Math.PI / 2 : Math.PI / 2;
    }
  }
  const alon = theta / sn + OLON;

  return [alat * (180.0 / Math.PI), alon * (180.0 / Math.PI)];
}

// 필터용 카테고리와 지역 리스트
const CATEGORY_KEYWORDS = [
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

const defaultPosition = [37.5665, 126.978]; // 서울 중심

export default function PlacesMap() {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const converted = placesData.map((p) => {
      const x = Number(p.mapx);
      const y = Number(p.mapy);
      if (!isNaN(x) && !isNaN(y)) {
        const [lat, lng] = tm128ToWgs84(x, y);
        return { ...p, lat, lng };
      }
      return { ...p, lat: defaultPosition[0], lng: defaultPosition[1] };
    });
    setPlaces(converted);
  }, []);

  useEffect(() => {
    let filtered = [...places];
    if (selectedCity) {
      filtered = filtered.filter((p) => p.city === selectedCity);
    }
    if (selectedDistrict) {
      filtered = filtered.filter((p) => p.district === selectedDistrict);
    }
    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }
    setFilteredPlaces(filtered);
  }, [places, selectedCity, selectedDistrict, selectedCategory]);

  const districtsForSelectedCity =
    selectedCity && REGION_LIST.find((r) => r.city === selectedCity)
      ? REGION_LIST.find((r) => r.city === selectedCity).districts
      : [];

  return (
    <>
      <div style={{ padding: 10 }}>
        <label>
          도시 선택:{" "}
          <select
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setSelectedDistrict("");
            }}
          >
            <option value="">전체</option>
            {REGION_LIST.map((r) => (
              <option key={r.city} value={r.city}>
                {r.city}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 15 }}>
          지역 선택:{" "}
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            disabled={!selectedCity}
          >
            <option value="">전체</option>
            {districtsForSelectedCity.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label style={{ marginLeft: 15 }}>
          카테고리 선택:{" "}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">전체</option>
            {CATEGORY_KEYWORDS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: 10 }}>
          {filteredPlaces.length}개 장소가 선택된 조건에 맞습니다.
        </div>
      </div>

      <MapContainer
        center={defaultPosition}
        zoom={13}
        style={{ height: "80vh", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {filteredPlaces.map((place, idx) => (
          <Marker key={idx} position={[place.lat, place.lng]}>
            <Popup>
              <strong dangerouslySetInnerHTML={{ __html: place.name }} />
              <br />
              {place.address || place.roadAddress || "주소 정보 없음"}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </>
  );
}
