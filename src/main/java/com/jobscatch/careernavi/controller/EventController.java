package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.domain.Event;
import com.jobscatch.careernavi.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class EventController {

    private final EventRepository eventRepository;

    // ✅ 절대 경로로 변경: 현재 프로젝트 루트에 uploads 디렉토리 자동 생성
    private final String uploadPath = System.getProperty("user.dir") + "/uploads";

    @GetMapping
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event create(
            @RequestParam String date,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        Event event = new Event();
        event.setDate(date);
        event.setTitle(title);
        event.setDescription(description);

        if (image != null && !image.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + image.getOriginalFilename();
            File dest = new File(uploadPath + "/" + fileName);

            // ✅ uploads 폴더가 없으면 자동 생성
            dest.getParentFile().mkdirs();

            image.transferTo(dest);
            event.setImageUrl("/uploads/" + fileName);
        }

        return eventRepository.save(event);
    }

    @PutMapping("/{id}")
    public Event update(
            @PathVariable Long id,
            @RequestParam String date,
            @RequestParam String title,
            @RequestParam(required = false) String description,
            @RequestParam(required = false) MultipartFile image
    ) throws IOException {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 기록 없음: " + id));

        event.setDate(date);
        event.setTitle(title);
        event.setDescription(description);

        if (image != null && !image.isEmpty()) {
            String uuid = UUID.randomUUID().toString();
            String fileName = uuid + "_" + image.getOriginalFilename();
            File dest = new File(uploadPath + "/" + fileName);

            // ✅ uploads 폴더가 없으면 자동 생성
            dest.getParentFile().mkdirs();

            image.transferTo(dest);
            event.setImageUrl("/uploads/" + fileName);
        }

        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
}
