// src/main/java/com/jobscatch/careernavi/controller/EventController.java
package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.domain.Event;
import com.jobscatch.careernavi.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/calendar")
@RequiredArgsConstructor
public class EventController {

    private final EventRepository eventRepository;

    @GetMapping
    public List<Event> getAll() {
        return eventRepository.findAll();
    }

    @PostMapping
    public Event create(@RequestBody Event event) {
        return eventRepository.save(event);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        eventRepository.deleteById(id);
    }
}
