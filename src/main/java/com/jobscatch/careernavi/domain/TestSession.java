package com.jobscatch.careernavi.domain;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TestSession {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;

    private String testType;

    private String status; // IN_PROGRESS, COMPLETED

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private String reportUrl;

    @OneToMany(mappedBy = "session", cascade = CascadeType.ALL)
    private List<TestAnswer> answers;
}
