
# 📘 Career Navi API 문서

- **버전**: MVP 1.0  
- **작성일**: 2025.04.29  
- **작성자**: 팀 잡스캐치

---

## 📌 1. ChatGPT AI 채팅 API

### 🔹 POST `/api/chat/send`

사용자의 메시지를 받아 AI가 응답합니다.

**요청 예시**
```json
{
  "role": "user",
  "message": "AI 개발자에 대해 알려줘",
  "createdAt": "2025-04-29 13:00:00"
}
```

**응답 예시**
```json
{
  "id": 1,
  "role": "ai",
  "message": "AI 개발자는 인공지능 모델을 개발하고...",
  "createdAt": "2025-04-29 13:00:01"
}
```

---

## 📌 2. CareerNet 직업 정보 API

### 🔹 GET `/api/career/jobs?pageIndex=1`

페이지 단위로 직업 목록을 조회합니다.

**응답 예시**
```json
{
  "count": 3000,
  "pageSize": 10,
  "pageIndex": 1,
  "jobs": [
    {
      "job_nm": "AI 개발자",
      "work": "AI 모델을 설계하고 학습시킵니다.",
      "aptit_name": "공학 전문직",
      "views": 12345,
      "likes": 234
    }
  ]
}
```

---

### 🔹 GET `/api/career/search?keyword=AI`

직업 키워드 기반으로 검색합니다.

**응답 예시**
```json
{
  "count": 4,
  "pageSize": 10,
  "pageIndex": 1,
  "jobs": [
    {
      "job_nm": "AI개발자",
      "work": "AI 모델을 개발하고 최적화하는 업무",
      "aptit_name": "공학 전문직",
      "views": 120233,
      "likes": 78,
      "wage": "4천만원↑"
    }
  ]
}
```

---

## ✅ 요약

| 기능               | URL                         | 메서드 | 설명                         |
|------------------|----------------------------|--------|----------------------------|
| AI 질문/응답        | `/api/chat/send`            | POST   | 사용자 질문 → AI 응답             |
| 직업 리스트         | `/api/career/jobs`          | GET    | 전체 직업 목록 (페이지 단위)       |
| 직업 키워드 검색     | `/api/career/search`        | GET    | 키워드로 직업 검색               |

---

## 🛠️ 개발 환경

- **Backend**: Spring Boot 3.4.5 (Java 17)
- **LLM API**: OpenAI GPT-4.1-nano
- **External API**: 커리어넷 OpenAPI
- **Database**: H2 (In-Memory)
- **Tool**: Postman (API 테스트)

---

## 💬 기타 참고사항

- 인증키는 `application.properties`에 설정:
  ```
  careernet.api.key=발급받은키값
  ```
- ChatGPT API 사용 시 **쿼터 초과 주의 (429 오류 발생 가능)**
- 커리어넷 직업 API는 **페이지네이션 지원** (`pageIndex` 파라미터 사용)
```

