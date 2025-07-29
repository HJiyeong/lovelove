// RomanceAdviceController.java
package com.jobscatch.careernavi.controller;

import com.jobscatch.careernavi.dto.RomanceAdviceDto;
import com.jobscatch.careernavi.service.RomanceAdviceService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/romance-advice")
public class RomanceAdviceController {

    private final RomanceAdviceService adviceService;

    public RomanceAdviceController(RomanceAdviceService adviceService) {
        this.adviceService = adviceService;
    }

    @GetMapping
    public List<RomanceAdviceDto> getAdviceList(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String platform,
            @RequestParam(required = false) String tag
    ) {
        return adviceService.getFilteredData(search, platform, tag);
    }
}
