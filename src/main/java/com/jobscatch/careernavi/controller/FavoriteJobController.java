package com.jobscatch.careernavi.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import java.io.*;
import java.nio.file.*;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;

@RestController
@RequestMapping("/api/favorite-jobs")
public class FavoriteJobController {

    private static final Path FILE_PATH = Paths.get(System.getProperty("user.dir"), "career-navi-frontend1", "public", "data", "favorite_job.json");

    private static final ObjectMapper mapper = new ObjectMapper();

    @PostMapping
    public ResponseEntity<?> addFavoriteJob(@RequestBody Map<String, String> body) {
        String jobCd = body.get("jobCd");
        String jobNm = body.get("jobNm");
        String jobWork = body.get("jobWork"); // 하는 일

        if (jobCd == null || jobCd.isEmpty()) {
            return ResponseEntity.badRequest().body("jobCd is missing");
        }

        try {
            List<Map<String, String>> currentList = new ArrayList<>();
            if (Files.exists(FILE_PATH)) {
                currentList = mapper.readValue(FILE_PATH.toFile(), new TypeReference<List<Map<String, String>>>() {});
            }

            boolean alreadyExists = currentList.stream()
                    .anyMatch(entry -> jobCd.equals(entry.get("jobCd")));

            if (!alreadyExists) {
                Map<String, String> newEntry = new HashMap<>();
                newEntry.put("jobCd", jobCd);
                newEntry.put("jobNm", jobNm);
                newEntry.put("jobWork", jobWork);
                currentList.add(newEntry);

                mapper.writerWithDefaultPrettyPrinter().writeValue(FILE_PATH.toFile(), currentList);
            }

            return ResponseEntity.ok("Saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("File write error: " + e.getMessage());
        }
    }


}
