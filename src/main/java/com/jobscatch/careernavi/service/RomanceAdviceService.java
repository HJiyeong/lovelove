// RomanceAdviceService.java
package com.jobscatch.careernavi.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.jobscatch.careernavi.dto.RomanceAdviceDto;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
public class RomanceAdviceService {

    private final List<RomanceAdviceDto> allData;

    public RomanceAdviceService() throws Exception {
        ObjectMapper mapper = new ObjectMapper();
        InputStream is = getClass().getClassLoader().getResourceAsStream("recommendations.json");
        allData = mapper.readValue(is, new TypeReference<>() {});
    }

    public List<RomanceAdviceDto> getFilteredData(String search, String platform, String tag) {
    return allData.stream()
        .filter(item -> search == null || search.isBlank() ||
                item.getTitle().toLowerCase(Locale.ROOT).contains(search.toLowerCase()) ||
                item.getDescription().toLowerCase(Locale.ROOT).contains(search.toLowerCase()))
        .filter(item -> platform == null || platform.isBlank() || platform.equals("전체") ||
                item.getPlatform().equalsIgnoreCase(platform))
        .filter(item -> tag == null || tag.isBlank() || tag.equals("전체") ||
    item.getTags().stream().anyMatch(t -> t.toLowerCase().contains(tag.toLowerCase())))
        .collect(Collectors.toList());
}

    
}
