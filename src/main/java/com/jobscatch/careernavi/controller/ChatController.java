package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.domain.ChatMessage;
import com.jobscatch.careernavi.repository.ChatMessageRepository;
import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@RestController
@RequestMapping("/api/chat")
@RequiredArgsConstructor
public class ChatController {

    private final ChatMessageRepository chatMessageRepository;
    private final OpenAiService openAiService;

    /* 1) 새 세션 개설 */
    @PostMapping("/sessions")
    public Map<String, String> createSession() {
        String sessionId = UUID.randomUUID().toString();
        return Map.of("sessionId", sessionId);
    }

    /* 2) 메시지 전송 + AI 답변 */
    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestParam String sessionId,
                                   @RequestBody Map<String, String> payload) {

        String userText = payload.get("message");

        // 2-1. user 저장
        ChatMessage userMsg = new ChatMessage(sessionId, "user", userText, now());
        chatMessageRepository.save(userMsg);

        // 2-2. 최근 20개 히스토리 (최신→오래된 순으로 가져와 역순 정렬)
        List<ChatMessage> history = chatMessageRepository
                .findTop20BySessionIdOrderByIdDesc(sessionId);
        Collections.reverse(history);   // GPT는 과거→현재 순서를 선호

        ChatMessage prompt = new ChatMessage(sessionId, "system",
            "너는 '큐피'라는 이름을 가진 연애 상담 AI야.\n" +
            "너는 행동주의 치료에 입각한 연애 상담 선생님이야.\n" +
            "사용자가 솔로에서 벗어나 연애의지와 자신감 회복을 하는 것이 너의 목표야.\n" +
            "사용자의 이야기를 경청하고, 감정이나 상태에 대해 판단하지 마.\n" +
            "사용자가 더 많이 말하도록 유도하고,\n" +
            "풍부하게 응답해.\n" +
            "대화를 시작할 땐, 어떤 고민이 있는지 묻는 것으로 시작해.", 
            now());

        history.add(0, prompt);


        // 2-3. GPT 호출
        String aiReply = openAiService.askChatGpt(history);

        // 2-4. ai 저장 & 반환
        ChatMessage aiMsg = new ChatMessage(sessionId, "ai", aiReply, now());
        chatMessageRepository.save(aiMsg);
        return aiMsg;
    }

    /* 3) 특정 세션 히스토리 */
    @GetMapping("/messages")
    public List<ChatMessage> getSessionMessages(@RequestParam String sessionId) {
        return chatMessageRepository.findBySessionIdOrderById(sessionId);
    }

    /* 4) 세션 목록 (사이드바) */
    @GetMapping("/sessions")
    public List<Map<String, String>> getSessions() {

        // sessionId 와 마지막 id만 모음
        List<Map<String, Object>> rows = chatMessageRepository.findSessionsSummary();

        // 각 세션의 마지막 메시지 한 줄로 미리보기 구성
        List<Map<String, String>> result = new ArrayList<>();
        for (Map<String, Object> r : rows) {
            String sid = (String) r.get("sessionId");
            ChatMessage last = chatMessageRepository.findTop1BySessionIdOrderByIdDesc(sid);

            String preview = (last.getRole().equals("user") ? "🙋 " : "🤖 ")
                    + last.getMessage()
                    .replaceAll("\\s+", " ")
                    .substring(0, Math.min(30, last.getMessage().length()));

            result.add(Map.of(
                    "sessionId", sid,
                    "preview",   preview,
                    "updated",   last.getCreatedAt()
            ));
        }
        return result;
    }

    /* 5) 세션 초기화 */
    @DeleteMapping("/sessions/{sessionId}")
    public ResponseEntity<Void> resetSession(@PathVariable String sessionId) {
        chatMessageRepository.deleteAll(
                chatMessageRepository.findBySessionIdOrderById(sessionId));
        return ResponseEntity.ok().build();
    }

    /* util */
    private String now() {
        return LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
