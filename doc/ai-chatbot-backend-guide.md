
# 🤖 Career Navi - AI 챗봇 백엔드 가이드

버전: MVP 1.0  
작성일: 2025.04.29  
작성자: 황지영 (잡스캐치 팀)  
기능명: AI 진로 상담 챗봇 (ChatGPT + 커리어넷)

---

## ✅ 1. 개요

AI 챗봇 기능은 사용자의 진로 관련 질문을 입력하면,  
ChatGPT API를 통해 답변을 받고, 해당 메시지를 DB에 저장합니다.  
추가로, 커리어넷의 공공데이터 API를 활용해 실제 직업 정보도 제공할 수 있습니다.

---

## ✅ 2. 기능 흐름 요약

```
[사용자 입력]
↓
[POST /api/chat/send]
↓
[OpenAiService → ChatGPT 호출]
↓
[DB에 질문/응답 저장]
↓
[응답 전송]
```

---

## ✅ 3. 주요 경로 및 클래스 설명

| 경로 | 설명 |
|------|------|
| `domain/ChatMessage.java` | 채팅 메시지 엔티티 |
| `repository/ChatMessageRepository.java` | 채팅 메시지 저장용 JPA |
| `controller/ChatController.java` | `/api/chat/send`, `/api/chat/messages` |
| `service/OpenAiService.java` | GPT-4 API 요청 로직 포함 |

---

## ✅ 4. ChatGPT 연동 정보

- 사용 API: `https://api.openai.com/v1/chat/completions`
- 모델: `gpt-4.1-nano` (초경량 요금)
- 토큰 요금: **지속 확인 요망**
- Key 관리: `application.properties`에 다음 항목 추가
```properties
openai.api.key=sk-xxxxxx...
```

---

## ✅ 5. CareerNet API 연동 개요

- 사용 목적: AI 응답에 현실 직업 정보 추가 제공
- API 예시:
    - `GET /api/career/search?keyword=AI`
    - `GET /api/career/jobs?pageIndex=1`
- 연동 클래스:
    - `service/CareerNetService.java`
    - `controller/CareerNetController.java`
- 인증키 설정:
```properties
careernet.api.key=발급받은키
```

---

## ✅ 6. 로컬 실행 방법

1. 백엔드 서버 실행
```
./gradlew bootRun
```

2. Postman으로 테스트 (예시 요청)
```json
POST http://localhost:8080/api/chat/send
{
  "role": "user",
  "message": "AI 관련 직업 추천해줘",
  "createdAt": "2025-04-29 13:00:00"
}
```

---

## ✅ 7. TODO / 향후 계획

- [ ] 프론트 연결 및 대화 UI 구성
- [ ] 사용자별 대화 히스토리 조회 기능
- [ ] 추천 직업 클릭 시 CareerNet 상세보기 연결
- [ ] 키워드 기반 자동 CareerNet 연동 기능

---

## ✅ 8. 참고 사항

- DB는 현재 H2 In-Memory 사용 (배포 전 RDS 등으로 교체 예정)
- 에러 예시
    - ChatGPT: 429 (쿼터 초과)
    - CareerNet: 404 (URL 오타 or 인증키 문제)

---

## 📎 커밋 메시지 예시

- `feat: add ChatGPT API integration`
- `feat: implement chat message saving`
- `feat: add CareerNet job search API`
- `docs: add AI chatbot backend guide`

---
