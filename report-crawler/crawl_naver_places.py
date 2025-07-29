import requests
import json
import time

CLIENT_ID = "14KR1MHpTOKC4NUhsdEe"
CLIENT_SECRET = "xUv4LEaMsJ"

CATEGORY_KEYWORDS = ["데이트 카페", "데이트 맛집", "분위기 좋은 술집", "분위기 좋은 칵테일바"]

NAVER_LOCAL_API_URL = "https://openapi.naver.com/v1/search/local.json"

headers = {
    "X-Naver-Client-Id": CLIENT_ID,
    "X-Naver-Client-Secret": CLIENT_SECRET
}

def search_places(query, display=30, start=1, sort="random"):
    params = {
        "query": query,
        "display": display,
        "start": start,
        "sort": sort
    }
    print(f"[DEBUG] API 요청 - 쿼리: {query}")
    response = requests.get(NAVER_LOCAL_API_URL, headers=headers, params=params)
    if response.status_code == 200:
        print(f"[DEBUG] API 응답 성공 - 쿼리: {query}")
        return response.json()
    else:
        print(f"[ERROR] API 응답 실패 ({response.status_code}) - 쿼리: {query}")
        print(f"        메시지: {response.text}")
        return None

def main():
    all_results = []

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
                    print(f"[INFO] 검색 결과 수: {len(data['items'])}")
                    for item in data["items"]:
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
                            "search_keyword": keyword
                        }
                        all_results.append(place)
                else:
                    print(f"[WARN] 검색 결과 없음 또는 오류 - 쿼리: {keyword}")

                time.sleep(0.5)  # API 요청 제한 대응

    with open("all_places_naver_api.json", "w", encoding="utf-8") as f:
        json.dump(all_results, f, ensure_ascii=False, indent=2)

    print(f"[INFO] 총 {len(all_results)}개 장소 저장 완료.")

if __name__ == "__main__":
    main()
