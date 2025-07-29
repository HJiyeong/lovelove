package com.jobscatch.careernavi.service;
import com.jobscatch.careernavi.domain.TestSession;
import com.jobscatch.careernavi.repository.TestAnswerRepository;
import com.jobscatch.careernavi.repository.TestSessionRepository;
import com.jobscatch.careernavi.domain.TestAnswer;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.stream.Collectors;


import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.IntStream;

@Service
@RequiredArgsConstructor
public class TestService {

    private final TestSessionRepository testSessionRepository;
    private final TestAnswerRepository testAnswerRepository;

    // 검사 유형 → 심리검사 번호
    private static final Map<String, Integer> testTypeToQno = Map.of(
            "흥미 검사", 31,    // 직업흥미검사(K) - 고등학생
            "성향 검사", 25     // 직업가치관검사 - 고등학생
    );

    // 검사 유형 → 대상 코드 (고등학생: 100207)
    private static final Map<String, String> testTypeToTargetSe = Map.of(
            "흥미 검사", "100207",
            "성향 검사", "100207"
    );



    // 세션 생성 메서드
    public Map<String, Object> startTestSession(String userId, String testType) {
        TestSession session = TestSession.builder()
                .userId(userId)
                .testType(testType)
                .status("IN_PROGRESS")
                .startTime(LocalDateTime.now())
                .build();

        TestSession savedSession = testSessionRepository.save(session);

        Map<String, Object> response = new HashMap<>();
        response.put("sessionId", savedSession.getId());
        response.put("status", savedSession.getStatus());
        response.put("startTime", savedSession.getStartTime());

        return response;
    }

    @Value("${careernet.api.key}")
    private String apiKey;

    // 문항 조회 메서드
    public Map<String, Object> getTestQuestions(Long sessionId) {

        TestSession session = testSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));

        String testType = session.getTestType();
        Integer qno = testTypeToQno.get(testType);

        if (qno == null) {
            throw new IllegalArgumentException("해당 검사 유형은 진로심리검사에 해당하지 않습니다: " + testType);
        }



        String url = String.format(
                "https://www.career.go.kr/inspct/openapi/test/questions?apikey=%s&q=%d",
                apiKey,
                qno
        );

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> response = restTemplate.getForEntity(url, Map.class);




        return response.getBody();
    }

    public void saveAnswer(Long sessionId, Integer questionNo, String answerValue) {
        TestSession session = testSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));

        TestAnswer answer = TestAnswer.builder()
                .session(session)
                .questionNo(questionNo)
                .answerValue(answerValue)
                .build();

        testAnswerRepository.save(answer);
    }

    public Map<String, Object> submitTest(Long sessionId, Map<String, String> userInfo) {
        TestSession session = testSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));

        String testType = session.getTestType();
        Integer qno = testTypeToQno.get(testType);
        String targetSe = testTypeToTargetSe.get(testType);

        if (qno == null || targetSe == null) {
            throw new IllegalArgumentException("해당 검사 유형은 제출할 수 없습니다: " + testType);
        }

// 1. 답변 모으기
        List<TestAnswer> answers = testAnswerRepository.findBySessionId(sessionId);
        if (answers == null || answers.isEmpty()) {
            throw new IllegalArgumentException("저장된 답변이 없습니다.");
        }

// 답변 Map으로 변환 (no -> value)
        Map<Integer, String> answerMap = answers.stream()
                .collect(Collectors.toMap(TestAnswer::getQuestionNo, TestAnswer::getAnswerValue));

// 총 문항 수 설정 (테스트 타입에 따라)
        int totalQuestions = 146;  // 흥미 검사 (qno=31)
        if ("성향 검사".equals(session.getTestType())) {
            totalQuestions = 145;  // 성향 검사 (qno=25)
        }

// 1번부터 totalQuestions번까지 순회하면서 답변 채우기
        String answerString = IntStream.rangeClosed(1, totalQuestions)
                .mapToObj(no -> no + "=" + answerMap.getOrDefault(no, "-"))
                .collect(Collectors.joining(" "));


        // 2. 요청 바디 만들기
        Map<String, Object> body = new HashMap<>();
        body.put("apikey", apiKey);
        body.put("qestrnSeq", qno.toString());
        body.put("trgetSe", targetSe);
        body.put("name", userInfo.get("name"));
        body.put("gender", userInfo.get("gender"));  // 100323 (남자) / 100324 (여자)
        body.put("school", userInfo.getOrDefault("school", ""));
        body.put("grade", userInfo.get("grade"));
        body.put("startDtm", System.currentTimeMillis());
        body.put("answers", answerString);

        // 3. 커리어넷에 POST 전송
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://www.career.go.kr/inspct/openapi/test/report",
                HttpMethod.POST,
                requestEntity,
                Map.class
        );

        Map<String, Object> result = (Map<String, Object>) response.getBody().get("RESULT");
        if (result != null) {
            String reportUrl = (String) result.get("url");
            session.setReportUrl(reportUrl);
            session.setStatus("COMPLETED");
            session.setEndTime(LocalDateTime.now());
            testSessionRepository.save(session);
        }

        return result;
    }

    public Map<String, Object> getTestResult(Long sessionId) {
        TestSession session = testSessionRepository.findById(sessionId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 세션입니다."));

        if (!"COMPLETED".equals(session.getStatus())) {
            throw new IllegalStateException("아직 완료되지 않은 검사입니다.");
        }

        Map<String, Object> result = new HashMap<>();
        result.put("reportUrl", session.getReportUrl());
        result.put("status", session.getStatus());
        result.put("endTime", session.getEndTime());



        return result;
    }



}
