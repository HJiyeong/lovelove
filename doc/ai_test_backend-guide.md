
# 📘 Career Navi - AI 진로검사 백엔드 구축 문서

버전: 2025.04.29 (MVP 1.0)  
작성자: 팀 잡스캐치  
대상: 백엔드 및 프론트엔드 연동 개발자

---

## ✨ 프로젝트 개요

- **목적**: 커리어넷 진로심리검사 API + ChatGPT 모델을 활용하여 사용자의 적성/성향에 맞는 진로 추천
- **범위**: 진로 심리검사 (흥미 검사 / 성향 검사) 시작 → 문제 조회 → 답변 저장 → 결과 제출 → 결과 리포트 조회
- **백엔드 환경**:
    - Spring Boot 3.4.5 (Java 17)
    - JPA + H2 (In-memory DB)
    - OpenAI GPT-4.1-nano (챗봇 별도 존재)
    - 커리어넷 진로심리검사 OpenAPI 연동

---

## 🛠 시스템 구성

### 📂 Entity

| Entity | 설명 |
|:---|:---|
| `TestSession` | 한 번의 검사 세션(사용자 단위 검사) |
| `TestAnswer` | 각 세션에 대한 문항별 답변 |

---

### 📂 Repository

| Repository | 설명 |
|:---|:---|
| `TestSessionRepository` | 세션 CRUD |
| `TestAnswerRepository` | 답변 CRUD (session_id로 검색 가능) |

---

### 📂 Service

| Service | 설명 |
|:---|:---|
| `TestService` | 세션 생성 / 문제 조회 / 답변 저장 / 제출 / 결과 조회 전담 |

---

### 📂 Controller

| Controller | 설명 |
|:---|:---|
| `TestController` | API 엔드포인트 제공 (Rest API) |

---

## 📌 지원하는 검사 종류

| 검사 이름 | 검사 번호(qestrnSeq) | 대상코드(trgetSe) |
|:---|:---|:---|
| 흥미 검사 (직업흥미검사-K) | 31 | 100207 |
| 성향 검사 (직업가치관검사) | 25 | 100207 |

※ 대상코드 100207 = 고등학생

---

## 📌 주요 API 설계

| 기능 | URL | Method | 요청/응답 설명 |
|:---|:---|:---|:---|
| 세션 생성 | `/api/test/start` | POST | 사용자 ID + 검사 유형 입력, 세션ID 발급 |
| 문제 조회 | `/api/test/questions/{sessionId}` | GET | 검사 유형에 맞는 문항 조회 |
| 답변 저장 | `/api/test/answer` | POST | 세션ID + 문항번호 + 답변 저장 |
| 검사 제출 | `/api/test/submit` | POST | 모든 답변 모아 커리어넷에 제출 |
| 결과 조회 | `/api/test/result/{sessionId}` | GET | 검사 완료 후 결과 리포트 URL 조회 |

---

## 📌 API 상세 설명

### 1. 세션 생성

- URL: `POST /api/test/start`
- Body 예시:

```json
{
  "userId": "user123",
  "testType": "흥미 검사"
}
```
- 응답 예시:

```json
{
  "sessionId": 1,
  "status": "IN_PROGRESS",
  "startTime": "2025-04-29T16:00:00"
}
```

---

### 2. 문제 조회

- URL: `GET /api/test/questions/{sessionId}`
- 응답 예시:

```json
{
  "SUCC_YN": "Y",
  "RESULT": [
    {
      "question": "몸을 구부리는 동작을 잘 할 수 있다.",
      "answer01": "매우낮음",
      "answer02": "낮음",
      "answer03": "약간낮음"
      
    }
   
  ]
}
```
※ 커리어넷 API v1 사용 (`test/questions`)

---

### 3. 답변 저장

- URL: `POST /api/test/answer`
- Body 예시:

```json
{
  "sessionId": 1,
  "questionNo": 1,
  "answerValue": "5"
}
```
- 응답:

```json
{
  "message": "Answer saved successfully!"
}
```

---

### 4. 검사 제출

- URL: `POST /api/test/submit`
- Body 예시:

```json
{
  "sessionId": 1,
  "userInfo": {
    "gender": "100323",
    "grade": "2",
    "school": "율도고등학교"
  }
}
```
- 응답 성공시:

```json
{
  "inspctSeq": "38918021",
  "url": "https://www.career.go.kr/inspct/web/psycho/vocation/report?seq=XXXXX"
}
```
- (※ 테스트에서는 커리어넷 API 호출 실패시 fake-url로 세팅)

---

### 5. 결과 조회

- URL: `GET /api/test/result/{sessionId}`
- 응답 예시:

```json
{
  "reportUrl": "https://fake-url.com/report/test123",
  "status": "COMPLETED",
  "endTime": "2025-04-29T16:30:00"
}
```

---

## ⚡ 특이사항 및 주의사항

- **sessionId**는 반드시 세션 생성 후 받아와야 함
- 답변(`TestAnswer`)은 한 문항당 하나만 저장되어야 함 (중복 불가)
- `submitTest` 호출 시:
    - answers가 모두 입력되어야 정상 제출 가능
    - POST 시 포맷이 엄격함 (ex: "1=5 2=4 3=3 ...")
- 테스트에서는 `커리어넷 API`가 제한되므로 `fake-url` 세팅 가능
- 실서비스 전 배포 시 **강제 세팅 코드 삭제** 필요!

---

## 💬 추가 참고사항

- application.properties에 API KEY 등록 필요
```properties
careernet.api.key=발급받은키
```

- RestTemplate 사용시 커리어넷 서버 상태에 따라 429, 500 오류 발생 가능
- JPA로 DB 연결되어있지만, 현재는 H2 메모리DB이므로 서버 재시작시 데이터 초기화됨

---

# 🎉 최종 정리

| 항목 | 완료 여부 |
|:---|:---|
| 진로 심리검사 백엔드 구축 | ✅ 완료 |
| API 명세 및 테스트 | ✅ 완료 (테스트 한정 이슈 제외) |
| 프론트 연동 준비 | ⬜ (대기) |

---

# ✨ 끝으로

> 이 문서 한 장이면,  
> **어떤 개발자라도 지금까지 구축한 전체 흐름을 이어서 개발할 수 있습니다.**  
> (문서 분량은 길지만, 너희가 한 일도 그만큼 대단해!)


# 📬 Career Navi API 요청/응답 예시 모음

(2025.04.29 기준)

---

## 1. 세션 생성 (Start Test Session)

- **URL**: `POST http://localhost:8080/api/test/start`
- **Headers**:
    - Content-Type: `application/json`
- **Body** (예시):

```json
{
  "userId": "user123",
  "testType": "흥미 검사"
}
```

- **응답** (예시):

```json
{
  "sessionId": 1,
  "status": "IN_PROGRESS",
  "startTime": "2025-04-29T16:00:00"
}
```

---

## 2. 문제 조회 (Get Test Questions)

- **URL**: `GET http://localhost:8080/api/test/questions/1`
- **Headers**:
    - 없음
- **응답** (예시):

```json
{
  "SUCC_YN": "Y",
  "RESULT": [
    {
      "question": "몸을 구부리는 동작을 잘 할 수 있다.",
      "answer01": "매우낮음",
      "answer02": "낮음",
      "answer03": "약간낮음",
      "answer04": "보통",
      "answer05": "약간높음",
      ...
    },
    ...
  ]
}
```

---

## 3. 답변 저장 (Save Answer)

- **URL**: `POST http://localhost:8080/api/test/answer`
- **Headers**:
    - Content-Type: `application/json`
- **Body** (예시):

```json
{
  "sessionId": 1,
  "questionNo": 1,
  "answerValue": "5"
}
```

- **응답** (예시):

```json
{
  "message": "Answer saved successfully!"
}
```

---

✅ ※ 실제로는 1번 문항만 저장하는 게 아니라, **모든 문항**을 차례대로 저장해야 제출 가능!

---

## 4. 검사 제출 (Submit Test)

- **URL**: `POST http://localhost:8080/api/test/submit`
- **Headers**:
    - Content-Type: `application/json`
- **Body** (예시):

```json
{
  "sessionId": 1,
  "userInfo": {
    "gender": "100323",  // 남자
    "grade": "2",
    "school": "율도고등학교"
  }
}
```

- **응답** (예시):

```json
{
  "inspctSeq": "38918021",
  "url": "https://www.career.go.kr/inspct/web/psycho/vocation/report?seq=Mzg5MTgwMjE"
}
```
또는 테스트용 fake-url:

```json
{
  "url": "https://fake-url.com/report/test123"
}
```

---

## 5. 결과 조회 (Get Test Result)

- **URL**: `GET http://localhost:8080/api/test/result/1`
- **Headers**:
    - 없음
- **응답** (예시):

```json
{
  "reportUrl": "https://fake-url.com/report/test123",
  "status": "COMPLETED",
  "endTime": "2025-04-29T16:30:00"
}
```

---

# 📋 실전 개발 체크리스트

- 세션을 꼭 먼저 생성한다 → 세션 ID를 받아야 다음 단계 가능
- 세션별로 문제를 가져온다
- 하나하나 답변을 저장한다
- 저장 다 하고나서 제출한다
- 제출하고 나면 결과 리포트를 조회할 수 있다

✅ 이렇게 정확한 순서로 호출하면 된다.

---

# ✨ 추가 팁

- Postman에서 **Collection** 만들어서 순서대로 넣어두면 개발자들이 테스트하기 매우 편함.
- 실서버 배포시 fake-url 처리 부분 주의 (삭제 필요)

---

# 🔥 요약

> 이거 두 개 (`AI 검사 백엔드 구축 문서` + `Postman 요청/응답 예시 모음`) 세트면,  
> **어떤 동료든 바로 이어서 개발할 수 있다.**  
> (진짜 엄청 깔끔하게 완성해놨다 우리 ㅎㅎ)
