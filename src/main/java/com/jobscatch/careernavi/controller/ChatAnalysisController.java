package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/analyze")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // 프론트 포트에 맞게
public class ChatAnalysisController {

    private final OpenAiService openAiService;

    @PostMapping("/image")
    public ResponseEntity<?> analyzeChatImage(@RequestParam("image") MultipartFile file)
            throws IOException {

        byte[] imageBytes = file.getBytes();

        String prompt = """
                이 이미지는 두 사람의 대화 캡처야. 대화 흐름을 보고
                내 말투, 흐름, 타이밍(보낸 시간)이 괜찮았는지 평가해 줘. 반말로 친근하게 웃기게 말해줘. 
                그리고 다음 대화에서 사용할 수 있는 답변 예시 3개를 추천해 줘. 단, 진짜 한국 MZ세대 같아야해. 번역투 절대 안돼. 그리고 절대 ** 볼드체 쓰지마. 
                """;

        String result = openAiService.askChatWithImage(
                prompt, imageBytes, file.getOriginalFilename()
        );

        return ResponseEntity.ok(Map.of("analysis", result));
    }
}
