package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/style")
@RequiredArgsConstructor
public class StyleController {

    private final OpenAiService openAiService;

    /**
     * mode = style | face | color
     * gender = 남성 | 여성
     * age    = 만나이
     */
    @PostMapping("/analyze")
    public ResponseEntity<?> analyze(
            @RequestParam MultipartFile image,
            @RequestParam String mode,
            @RequestParam String gender,
            @RequestParam int age) {

        try {
            String result;
            switch (mode) {
                case "style" -> result = openAiService
                        .askStyleRecommendations(image.getBytes(), gender, age);
                case "face"  -> result = openAiService
                        .askFaceEvaluation(image.getBytes(), gender, age);
                case "color" -> result = openAiService
                        .askPersonalColor(image.getBytes(), gender);
                default -> throw new IllegalArgumentException("Unknown mode: " + mode);
            }

            return ResponseEntity.ok(Map.of("result", result));

        } catch (Exception e) {
            log.error("Analyze failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", e.getMessage()));
        }
    }
}
