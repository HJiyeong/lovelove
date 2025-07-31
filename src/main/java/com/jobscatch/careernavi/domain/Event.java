// src/main/java/com/jobscatch/careernavi/domain/Event.java
package com.jobscatch.careernavi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String date;

    private String title;

    @Column(length = 1000)
    private String description;

    private String imageUrl;
}

