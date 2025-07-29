package com.jobscatch.careernavi.service;

import com.jobscatch.careernavi.domain.Resume;
import com.jobscatch.careernavi.dto.ResumeRequest;
import com.jobscatch.careernavi.dto.ResumeResponse;
import com.jobscatch.careernavi.repository.ResumeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final OpenAiService openAiService;

    public ResumeResponse analyze(String text) {
        String result = openAiService.askChatGpt(text);
        return new ResumeResponse(result);
    }

    public Resume saveOrUpdate(ResumeRequest dto) {
        Resume resume = new Resume();
        resume.setTitle(dto.getTitle());
        resume.setText(dto.getText());
        resume.setAnalysis(openAiService.askChatGpt(dto.getText()));
        resume.setCreatedAt(now());
        resume.setUpdatedAt(now());
        return resumeRepository.save(resume);
    }

    public Resume findById(Long id) {
        return resumeRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Resume not found"));
    }

    public List<Resume> findAll() {
        return resumeRepository.findAll();
    }

    private String now() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
