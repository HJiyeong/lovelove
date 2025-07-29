// RomanceAdviceDto.java
package com.jobscatch.careernavi.dto;

import java.util.List;

public class RomanceAdviceDto {
    private String title;
    private String url;
    private String thumbnail;
    private String description;
    private String platform;
    private List<String> tags;

    // 기본 생성자
    public RomanceAdviceDto() {}

    // 전체 생성자
    public RomanceAdviceDto(String title, String url, String thumbnail, String description, String platform, List<String> tags) {
        this.title = title;
        this.url = url;
        this.thumbnail = thumbnail;
        this.description = description;
        this.platform = platform;
        this.tags = tags;
    }

    // Getter/Setter
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getUrl() { return url; }
    public void setUrl(String url) { this.url = url; }

    public String getThumbnail() { return thumbnail; }
    public void setThumbnail(String thumbnail) { this.thumbnail = thumbnail; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getPlatform() { return platform; }
    public void setPlatform(String platform) { this.platform = platform; }

    public List<String> getTags() { return tags; }
    public void setTags(List<String> tags) { this.tags = tags; }
}