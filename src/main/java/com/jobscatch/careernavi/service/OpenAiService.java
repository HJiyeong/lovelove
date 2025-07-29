package com.jobscatch.careernavi.service;

import com.jobscatch.careernavi.domain.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OpenAiService {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private static final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";

    /* ------------------------------------------------------------------
     * 1. 히스토리(최근 N개)까지 넘겨서 GPT가 문맥을 기억하도록 하는 버전
     * ------------------------------------------------------------------ */
    public String askChatGpt(List<ChatMessage> history) {

        /* (1) 메시지 배열 구성 : 시스템 프롬프트 + 히스토리 */
        List<Map<String, String>> messages = new ArrayList<>();

        messages.add(Map.of(
                "role", "system",
                "content",
                "당신은 진로/직업 상담 전문가 ‘커비’입니다. " +
                        "공감적이고 친절하게 학생에게 맞춤형 진로 조언을 제공합니다. " +
                        "대화를 기억해 맥락을 이어가세요."
        ));

        for (ChatMessage m : history) {
            messages.add(Map.of(
                    "role", m.getRole().equals("user") ? "user" : "assistant",
                    "content", m.getMessage()
            ));
        }

        /* (2) 요청 본문 */
        Map<String, Object> body = Map.of(
                "model", "gpt-4.1-nano",            // 필요 시 다른 모델로 교체
                "messages", messages
        );

        /* (3) HTTP 헤더 */
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        /* (4) POST 호출 */
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        ResponseEntity<Map> response = restTemplate.postForEntity(
                OPENAI_API_URL, entity, Map.class
        );

        /* (5) 답변 추출 */
        if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) response.getBody().get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> msg = (Map<String, Object>) choices.get(0).get("message");
                return (String) msg.get("content");
            }
        }
        return "죄송합니다. 답변을 가져올 수 없습니다.";
    }

    /* ------------------------------------------------------------------
     * 2. 단일 문장만 보낼 때 사용하는 기존 버전 (호환성 위해 남겨 둠)
     * ------------------------------------------------------------------ */
    public String askChatGpt(String userMessage) {
        return askChatGpt(
                List.of(new ChatMessage(null, "user", userMessage, null))
        );
    }
}
