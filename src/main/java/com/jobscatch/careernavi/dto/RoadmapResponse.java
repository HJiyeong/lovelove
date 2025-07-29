package com.jobscatch.careernavi.dto;

import java.util.List;

/**
 * GPT가 반환한 JSON → 파싱용 DTO
 */
public record RoadmapResponse(List<YearPlan> years) {

    public record YearPlan(
            int year,                    // 2025, 2026 …
            String theme,                // 그해 키워드
            List<Milestone> milestones   // 분기별 마일스톤
    ) {}

    public record Milestone(
            String id,            // "1Y_Q1-1" 등
            String title,         // 마일스톤 제목
            String quarter,       // Q1 | Q2 | …
            String successMetric  // 달성 기준
    ) {}
}
