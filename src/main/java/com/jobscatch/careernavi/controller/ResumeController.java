package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.domain.Resume;
import com.jobscatch.careernavi.dto.ResumeRequest;
import com.jobscatch.careernavi.dto.ResumeResponse;
import com.jobscatch.careernavi.repository.ResumeRepository;
import com.jobscatch.careernavi.service.OpenAiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/resume")
@RequiredArgsConstructor
public class ResumeController {

    private final OpenAiService openAiService;
    private final ResumeRepository resumeRepository;

    // 1. 자기소개서 분석
    @PostMapping("/analyze")
    public ResponseEntity<ResumeResponse> analyze(@RequestBody ResumeRequest request) {
        String prompt = buildPrompt(request.getText());
        String result = openAiService.askChatGpt(prompt);
        return ResponseEntity.ok(new ResumeResponse(result));
    }

    // 2. 저장 및 분석
    @PostMapping("/save")
    public ResponseEntity<Resume> save(@RequestBody ResumeRequest request) {
        String prompt = buildPrompt(request.getText());
        String analysis = openAiService.askChatGpt(prompt);

        Resume resume = new Resume();
        resume.setTitle(request.getTitle());
        resume.setText(request.getText());
        resume.setAnalysis(analysis);
        resume.setCreatedAt(now());
        resume.setUpdatedAt(now());

        return ResponseEntity.ok(resumeRepository.save(resume));
    }

    // 3. 자소서 단일 조회
    @GetMapping("/{id}")
    public Resume getById(@PathVariable Long id) {
        return resumeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 자기소개서를 찾을 수 없습니다."));
    }

    // 4. 전체 자소서 조회
    @GetMapping("/all")
    public List<Resume> getAll() {
        return resumeRepository.findAll();
    }

    @PostMapping("/rewrite")
    public ResponseEntity<String> rewrite(@RequestBody ResumeRequest request) {
        String prompt = "다음 자기소개서를 자연스럽고 한국어 화자한테 매력적이게 다듬어 주세요. 대학입시용이기에 잘 써야합니다. "
                + "사용자의 개성을 유지하되 문장 길이, 반복 표현, 흐름을 개선하고, 전체적으로 더 읽기 쉽게 표현해주세요. 본문만 대답합니다."
                + "단, 창작이 아닌 '수정'의 느낌으로, 원문과 큰 괴리 없이 바꿔주세요. 아래 원문을 참고하여 보완해 주세요.또한, 말 하는 형식이 아니라 글만 보여주세요. 다만 보고서 처럼 AI 커비가 첨삭한 글 이라며 소제목 정도는 달아도돼. : \n\n"
                + "[자기소개서 원문]\n" + request.getText();

        String rewritten = openAiService.askChatGpt(prompt);
        return ResponseEntity.ok(rewritten);
    }


    // ✅ 프롬프트 구성 함수
    private String buildPrompt(String userText) {
        return "당신은 전문적인 자기소개서 첨삭 전문가입니다.\n"
                + "아래는 사용자가 제출한 자기소개서입니다.\n\n"
                + "[자기소개서 본문]\n"
                + userText + "\n\n"
                + "[분석 요청]\n"
                + "1. 문장이 너무 긴 곳은 없는지 지적해주세요.\n"
                + "2. 반복 표현이나 모호한 표현이 있는지 찾아주세요.\n"
                + "3. 지원 동기가 구체적인지 분석해주세요.\n"
                + "4. 전체 구조와 흐름은 자연스러운지 판단해주세요.\n"
                + "5. 개선 방향을 항목별로 조언해주세요.\n\n"
                + "※ 응답은 Markdown 없이, 일반 텍스트로 깔끔하게 정리해주세요.또한 사람이 말하는게 아니라, 분석 리포트 같아야합니다. 또한 각 소제목에 1. 2. 3. 4. 5.을 붙이지 말고 큰 글씨체 혹은 다른 색 글씨로 구별하세요. ** 이게 보이잖아. 안보이게 해. 마크다운은 사용하지 않습니다. 분석이 끝나면 맨 마지막 줄에 아래 형식으로 자기소개서 점수를 제공해주세요.\n" +
                "\n" +
                "점수 (100점 만점) 85점\n";

    }

    // ✅ 시간 포맷 함수
    private String now() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
