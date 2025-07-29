package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.dto.RoadmapRequest;
import com.jobscatch.careernavi.dto.RoadmapResponse;
import com.jobscatch.careernavi.service.RoadmapService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    @PostMapping("/generate-custom")
    public RoadmapResponse generateFromPrompt(@RequestBody PromptRequest request) {
        return roadmapService.generateFromPrompt(request.prompt());
    }

    public record PromptRequest(String prompt) {}
}
