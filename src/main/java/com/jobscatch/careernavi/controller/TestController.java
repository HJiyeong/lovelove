package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;   // ✅ 추가
import java.util.Map;


@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {

    private final TestService testService;

    // 🆕 세션 생성 API
    @PostMapping("/start")
    public ResponseEntity<Map<String, Object>> startTestSession(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        String testType = request.get("testType");
        return ResponseEntity.ok(testService.startTestSession(userId, testType));
    }
    @GetMapping("/questions/{sessionId}")
    public ResponseEntity<Map<String, Object>> getTestQuestions(@PathVariable Long sessionId) {
        Map<String, Object> result = testService.getTestQuestions(sessionId);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/answer")
    public ResponseEntity<String> saveAnswer(@RequestBody Map<String, Object> request) {
        Long sessionId = Long.valueOf(request.get("sessionId").toString());
        Integer questionNo = Integer.valueOf(request.get("questionNo").toString());
        String answerValue = request.get("answerValue").toString();

        testService.saveAnswer(sessionId, questionNo, answerValue);

        return ResponseEntity.ok("Answer saved successfully");
    }

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitTest(@RequestBody Map<String, Object> request) {
        Long sessionId = Long.valueOf(request.get("sessionId").toString());
        Map<String, String> userInfo = (Map<String, String>) request.get("userInfo");

        Map<String, Object> result = testService.submitTest(sessionId, userInfo);

        return ResponseEntity.ok(result);
    }

    @GetMapping("/result/{sessionId}")
    public Map<String, Object> getTestResult(@PathVariable Long sessionId) {
        return testService.getTestResult(sessionId);
    }





}
