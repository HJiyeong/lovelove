package com.jobscatch.careernavi.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class DiagnosisRequest {
    private String typeName;
    private List<String> keywords;
    private String description;
    private List<JobDto> favoriteJobs;
}
