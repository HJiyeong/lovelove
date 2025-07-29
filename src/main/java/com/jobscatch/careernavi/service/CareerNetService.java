package com.jobscatch.careernavi.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;
import java.util.HashMap;


@Service
@RequiredArgsConstructor
public class CareerNetService {

    @Value("${careernet.api.key}")
    private String careerNetApiKey;

    private static final String CAREERNET_JOB_LIST_URL = "https://www.career.go.kr/cnet/front/openapi/jobs.json";

    public Map<String, Object> getJobList(int pageIndex) {
        RestTemplate restTemplate = new RestTemplate();

        String url = CAREERNET_JOB_LIST_URL + "?apiKey=" + careerNetApiKey
                + "&pageIndex=" + pageIndex;

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
        return response.getBody();
    }

    public Map<String, Object> searchJobList(String searchJobNm) {
        RestTemplate restTemplate = new RestTemplate();

        String url = CAREERNET_JOB_LIST_URL + "?apiKey=" + careerNetApiKey
                + "&searchJobNm=" + searchJobNm;

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
        return response.getBody();
    }

    public Map<String, Object> getAllJobList() {
        RestTemplate restTemplate = new RestTemplate();
        List<Map<String, Object>> allJobs = new ArrayList<>();

        int totalPages = 20; // 👉 실제 페이지 수에 맞게 늘려도 됨 (필요시 count 조회해서 자동 계산 가능)

        for (int page = 1; page <= totalPages; page++) {
            String url = CAREERNET_JOB_LIST_URL + "?apiKey=" + careerNetApiKey + "&pageIndex=" + page;
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
            Map<String, Object> body = response.getBody();

            List<Map<String, Object>> jobs = (List<Map<String, Object>>) body.get("jobs");
            if (jobs != null) {
                allJobs.addAll(jobs);
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("total", allJobs.size());
        result.put("jobs", allJobs);

        return result;
    }


    public Map<String, Object> getJobDetail(int seq) {
        RestTemplate restTemplate = new RestTemplate();

        String url = "https://www.career.go.kr/cnet/front/openapi/job.json"
                + "?apiKey=" + careerNetApiKey
                + "&seq=" + seq;

        ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.GET, null, Map.class);
        return response.getBody();
    }





}
