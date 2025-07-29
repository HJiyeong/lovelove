package com.jobscatch.careernavi.dto;

import java.util.List;

/**
 * 프론트에서 보내는 로드맵 생성 파라미터
 */
public record RoadmapRequest(
        String targetJob,          // 목표 직무 (예: "프론트엔드 개발자")
        int horizonYears,          // 몇 년 계획인지
        int weeklyHours,           // 주당 투입 가능 시간
        List<String> currentSkills,// 이미 보유한 기술 스택
        String personalityType,    // 성향 검사 결과 (예: "성취지향")
        List<String> favoriteJobs  // 관심직업 리스트
) {}
