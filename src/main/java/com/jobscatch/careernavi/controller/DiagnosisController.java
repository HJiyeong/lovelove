package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.dto.DiagnosisRequest;
import com.jobscatch.careernavi.dto.JobDto;
import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class DiagnosisController {

    private final OpenAiService openAiService;

    @PostMapping("/generate")
    public ResponseEntity<String> generateReport(@RequestBody DiagnosisRequest input) {

        // 프롬프트 구성
        String prompt = buildPrompt(input);

        // GPT 호출
        String response = openAiService.askChatGpt(prompt);

        return ResponseEntity.ok(response);
    }

    private String buildPrompt(DiagnosisRequest input) {
        StringBuilder sb = new StringBuilder();

        sb.append("다음은 한 학생의 진로심리검사 결과와 해당 학생이 관심을 가진 직업 목록입니다.\n")
                .append("당신은 이 학생에게 **전문 진로상담사**로서, 실제 진로 컨설팅 리포트를 작성하는 역할입니다.\n\n");

        sb.append("[학생 성향 요약]\n")
                .append("- 성향 유형: ").append(input.getTypeName()).append("\n")
                .append("- 주요 키워드: ").append(String.join(", ", input.getKeywords())).append("\n")
                .append("- 상세 설명: ").append(input.getDescription()).append("\n\n");

        sb.append("[관심 직업 목록]\n");
        if (input.getFavoriteJobs() != null && !input.getFavoriteJobs().isEmpty()) {
            for (int i = 0; i < input.getFavoriteJobs().size(); i++) {
                JobDto job = input.getFavoriteJobs().get(i);
                sb.append(String.format("%d. %s - %s\n", i + 1, job.getJobNm(), job.getJobWork()));
            }
        } else {
            sb.append("해당 없음\n");
        }

        sb.append("\n")
                .append("위 데이터를 바탕으로 **진로 적성 분석 보고서**를 작성해주세요.\n")
                .append("결과는 HTML 형식으로 출력해주세요. 마크다운은 사용하지 마세요.\n")
                .append("헤더, 소제목, 리스트, 강조 등을 활용하여 **시각적으로 보기 좋고 정돈된 구조**로 작성해주세요.\n\n")

                .append("[보고서 필수 포함 내용]\n")
                .append("1. **종합 진단 개요**: 이 학생의 성향이 어떤 특성을 가지며, 전반적인 진로 방향이 어떤 방향으로 향해야 하는지 분석해주세요.\n")
                .append("2. **관심 직업별 분석**:\n")
                .append("   - 해당 직업이 학생의 성향과 어떻게 연결되는지 설명해주세요.\n")
                .append("   - 직업의 수행 방식, 보람, 환경, 필요 자질 등을 고려한 적합성 평가를 제공해주세요.\n")
                .append("   - **해당 직업을 준비하기 위해 필요한 핵심 역량과 학습 방향**을 구체적이고 전문적으로 제시해주세요.\n")
                .append("   - 또한 관련 학과를 시각적으로 또렷하게 제시하세요. 줄글이 아니여도 됩니다.(대신 줄글이 아니라면, 가독성 있게 하세요)\n")
                .append("   - 관련학과와 더불어, 실제 이 직무를 하려면 쌓아야하는 스펙도 제시해주세요.\n")
                .append("   - 맨마지막에 *추천 직업*이라는 하나의 세션을 열어 (각각 직업마다가 아니라) 해당 직업들 중 성향과 잘 맞을 것 같은 직업들을 추천해주세요.(3순위까지 나열해보세요) \n")
                .append("3. **성장 및 발전을 위한 조언**:\n")
                .append("   - 이 학생이 해당 진로를 준비할 때 유의해야 할 점과 현실적인 어려움이 있다면 어떤 부분인지 진단해주세요.\n")
                .append("   - 좀 실질적으로 도움 될만한, 너무 따듯한 이야기 뿐만 아니라 좀 이성적이고 확실한 로드맵을 제시해주세요.(고등학생을 대상으로 하고 있으니, 자격증 같은 이야기도 좋으나 학생을 위한 조언도 들어가야합니다.)\n")
                .append("   - 진로 전문가처럼, 따뜻하고 친절한 말투로 **격려와 실질적인 조언**을 해주세요.(학생님 이라 하지 말것) \n\n")

                .append("※ HTML 태그를 활용해 시각적으로 아름답고 읽기 쉬운 구조를 구성해주세요.\n")
                .append("※ 마크다운은 사용하지 않습니다.\n");

        return sb.toString();
    }
}
