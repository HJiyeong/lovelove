import requests
import json
import time

# ✅ 네이버 API 인증 정보
CLIENT_ID = "14KR1MHpTOKC4NUhsdEe"
CLIENT_SECRET = "xUv4LEaMsJ"

# ✅ 지역 키워드 설정
CATEGORY_KEYWORDS = ["데이트 카페", "데이트 맛집", "분위기 좋은 술집", "분위기 좋은 칵테일바"]

# ✅ 네이버 API URL
NAVER_LOCAL_API_URL = "https://openapi.naver.com/v1/search/local.json"
NAVER_IMAGE_API_URL = "https://openapi.naver.com/v1/search/image"

# ✅ 공통 헤더
headers = {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET
}

# ✅ 지역 장소 검색
def search_places(query, display=30, start=1, sort="random"):
    params = {
        "query": query,
        "display": display,
        "start": start,
        "sort": sort
    }
    response = requests.get(NAVER_LOCAL_API_URL, headers=headers, params=params)
    if response.status_code == 200:
        return response.json()
    else:
        print(f"[ERROR] 장소 검색 실패 - {query} ({response.status_code})")
        return None

# ✅ 썸네일 이미지 검색
def search_image(query):
    params = {
        "query": query,
        "display": 1,
        "sort": "sim",
    }
    response = requests.get(NAVER_IMAGE_API_URL, headers=headers, params=params)
    if response.status_code == 200:
        items = response.json().get("items", [])
        if items:
            return items[0]["link"]
    return None

# ✅ 메인 크롤링 로직
def main():
    all_results = []

    # 🔁 지역 리스트 로드
    with open("region_list.json", "r", encoding="utf-8") as f:
        region_list = json.load(f)

    for region in region_list:
        city = region["city"]
        for district in region["districts"]:
            for category in CATEGORY_KEYWORDS:
                keyword = f"{district} {category}"
                print(f"[INFO] 검색 시작: {keyword}")
                data = search_places(keyword)
                if data and "items" in data:
                    for item in data["items"]:
                        title_clean = item.get("title", "").replace("<b>", "").replace("</b>", "")
                        thumbnail = search_image(title_clean)
                        place = {
                            "name": item.get("title"),
                            "category": item.get("category"),
                            "address": item.get("address"),
                            "roadAddress": item.get("roadAddress"),
                            "mapx": item.get("mapx"),
                            "mapy": item.get("mapy"),
                            "description": item.get("description"),
                            "link": item.get("link"),
                            "phone": item.get("telephone"),
                            "city": city,
                            "district": district,
                            "search_keyword": keyword,
                            "image": thumbnail  # ✅ 이미지 추가
                        }
                        all_results.append(place)
                else:
                    print(f"[WARN] 검색 결과 없음: {keyword}")

                time.sleep(0.6)  # API 요청 제한 대응

    # ✅ 결과 저장
    with open("date_places.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    print(f"[INFO] 총 {len(all_results)}개 장소 저장 완료.")

if __name__ == "__main__":
    main()
