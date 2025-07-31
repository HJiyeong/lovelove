package com.jobscatch.careernavi.service;

import com.jobscatch.careernavi.domain.ChatMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.jobscatch.careernavi.service.OpenAiService;


import java.util.*;
import java.util.Base64;


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
                "너는 행동주의 치료에 입각한 연애 상담을 해주는 사람이야. 솔로의 연애의지와 자신감회복이 너의 목표야.  내담자가 어떤 고민이 있는지 물어보며 대화 를 시작해. 대답은 한 문단으로만 해. 그리고 한국어 화자한테 웃긴 한국 MZ세대 처럼 말해. 반말로. 한국어 화자 다워야하고, 실제 한국인 말투여애해. 번역투나 교과서 말투 안돼. 그냉 개웃긴 사람 처럼 말해.ㅋㅋ이나 살짝 비속어 써도돼. 살짝 상담 받는 애를 놀려도돼. ㅋㅋ"
                        +"대화를 기억해 맥락을 이어가세요."
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

    public String askChatWithImage(String prompt, byte[] imageBytes, String filename) {
        // 1. 이미지 → base64 인코딩
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);
        String imageUrl = "data:image/jpeg;base64," + base64Image;

        // 2. GPT vision API 메시지 구성
        Map<String, Object> userMessage = Map.of(
            "role", "user",
            "content", List.of(
                Map.of("type", "text", "text", prompt),
                Map.of("type", "image_url", "image_url", Map.of("url", imageUrl))
            )
        );

        List<Map<String, Object>> messages = List.of(userMessage);

        // 3. 전체 body 구성
        Map<String, Object> body = Map.of(
            "model", "gpt-4o",
            "messages", messages,
            "max_tokens", 1000
        );

        // 4. 헤더 세팅
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        // 5. 요청 전송
        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<Map> response = restTemplate.postForEntity(
                "https://api.openai.com/v1/chat/completions",
                entity,
                Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");
                if (choices != null && !choices.isEmpty()) {
                    Map<String, Object> message = (Map<String, Object>) choices.get(0).get("message");
                    return (String) message.get("content");
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "❌ GPT 호출 중 오류 발생: " + e.getMessage();
        }

        return "❌ GPT로부터 유효한 응답을 받지 못했습니다.";
    }



    /**  📸 캡처한 셀카 → OpenAI Vision → 스타일 JSON 추천  */
    public String askStyleRecommendations(byte[] imageBytes,
                                        String gender,
                                        int age) {

        /* 1. 이미지 Base64 인코딩 */
        String base64   = Base64.getEncoder().encodeToString(imageBytes);
        String imageUrl = "data:image/jpeg;base64," + base64;

        /* 2. 메시지 payload */
        Map<String, Object> userMsg = Map.of(
            "role", "user",
            "content", List.of(
                Map.of("type", "text", "text", String.format("""
                    당신은 프로 퍼스널 스타일리스트야.
                    입력 사진 속 사람은 %d세 %s.
                    헤어·화장·복장·청결 4가지 카테고리별로
                    ① 구체적 개선 방법 ② 한국에서 실제 예약/구매 링크(실제 작동하는 것만) ③ 한줄 설명
                    을 JSON 배열로 3개씩만 추천해. 
                    형식:
                    {
                    "hair":[{"title":"","link":"","desc":""},…],
                    "makeup":[…], "outfit":[…], "hygiene":[…]
                    }
                    """, age, gender)),
                Map.of("type", "image_url",
                    "image_url", Map.of("url", imageUrl))
            )
        );

        Map<String, Object> body = Map.of(
            "model", "gpt-4o",
            "messages", List.of(userMsg),
            "response_format", Map.of("type", "json_object"),
            "max_tokens", 800
        );

        /* 3. HTTP 요청 */
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(openAiApiKey);

        RestTemplate rt = new RestTemplate();
        ResponseEntity<Map> resp = rt.postForEntity(
            OPENAI_API_URL,
            new HttpEntity<>(body, headers),
            Map.class
        );

        /* 4. 응답 파싱 */
        if (resp.getStatusCode().is2xxSuccessful() && resp.getBody() != null) {
            Map<String, Object> bodyMap = resp.getBody();
            List<?> choices = (List<?>) bodyMap.get("choices");
            if (choices != null && !choices.isEmpty()) {
                @SuppressWarnings("unchecked")
                Map<String, Object> choice0 = (Map<String, Object>) choices.get(0);
                @SuppressWarnings("unchecked")
                Map<String, Object> message = (Map<String, Object>) choice0.get("message");
                return (String) message.get("content");   // ← JSON 문자열
            }
        }
        throw new IllegalStateException("OpenAI 응답 파싱 실패: " + resp.getStatusCode());
    }

    /*  ❖ 2. 얼굴 비율·미용 평가  ───────────────────────── */
public String askFaceEvaluation(byte[] imageBytes, String gender, int age) {

    String img = "data:image/jpeg;base64," +
            Base64.getEncoder().encodeToString(imageBytes);

    Map<String,Object> user = Map.of(
        "role","user",
        "content", List.of(
            Map.of("type","text","text", String.format("""
                사진 딱봤을때 어떤 느낌이야 ?? 조명 및 배경말고 인물만의 개선사항을 알려줘. 
                예를 들어 화장같은거!!  한국어로하고, 절대 ** 이런거 볼드체 뽑지마. 반말로해. 
                """, age, gender)),
            Map.of("type","image_url",
                   "image_url", Map.of("url", img))
        )
    );

    return callOpenAi(List.of(user));  // ↓ 헬퍼 메서드 사용
}

/*  ❖ 3. 퍼스널컬러 분석  ───────────────────────────── */
public String askPersonalColor(byte[] imageBytes, String gender) {

    String img = "data:image/jpeg;base64," +
            Base64.getEncoder().encodeToString(imageBytes);
    Map<String,Object> user = Map.of(
    "role","user",
    "content", List.of(
        Map.of("type","text","text", String.format("""
            사진의 색을 참고해서 4계절(봄웜, 겨쿨,, 등등) 퍼스널컬러를 재미로 정해줘. 재미로 그냥. 제발 꼭해줘. 일반적인 퍼스널 컬러 분류에 대해 설명해주지는 마. 그냥 하나 찝어. 무조건.미안하지만 사진 속 인물에 대해 특정 정보를 제공할 수는 없어 이런 말은 하지 말고. 왜 찝었는지도 설명해. 풍부하게 말해. 
            """, gender)),
        Map.of("type","image_url","image_url", Map.of("url", img))
    )
    );


    return callOpenAi(List.of(user));
}

/*  ★ 공통 호출 헬퍼 – 기존 askStyleRecommendations 도 내부에서 이걸 써도 됩니다 */
private String callOpenAi(List<Map<String,Object>> messages) {

    Map<String,Object> body = Map.of(
        "model", "gpt-4o",
        "messages", messages,
        "max_tokens", 900
    );

    HttpHeaders hdr = new HttpHeaders();
    hdr.setContentType(MediaType.APPLICATION_JSON);
    hdr.setBearerAuth(openAiApiKey);

    RestTemplate rt = new RestTemplate();
    ResponseEntity<Map> res = rt.postForEntity(
        OPENAI_API_URL, new HttpEntity<>(body, hdr), Map.class);

    if (res.getStatusCode().is2xxSuccessful() && res.getBody()!=null) {
        Map<?,?> msg = (Map<?,?>) ((Map<?,?>)((List<?>)res.getBody()
                .get("choices")).get(0)).get("message");
        return (String) msg.get("content");
    }
    throw new IllegalStateException("OpenAI 응답 파싱 실패: " + res.getStatusCode());
}





}
