package com.jobscatch.careernavi.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobscatch.careernavi.dto.RoadmapResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final OpenAiService openAiService;
    private final ObjectMapper mapper = new ObjectMapper();

    public RoadmapResponse generateFromPrompt(String prompt) {
        System.out.println("====[🧾 PROMPT]====");
        System.out.println(prompt);

        String gptAnswer = openAiService.askChatGpt(prompt);
        System.out.println("====[🧠 GPT RESPONSE]====");
        System.out.println(gptAnswer);

        try {
            return mapper.readValue(gptAnswer, RoadmapResponse.class);
        } catch (Exception e) {
            throw new IllegalStateException("GPT JSON 파싱 실패:\n" + gptAnswer, e);
        }
    }
}
