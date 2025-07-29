// src/main/java/com/jobscatch/careernavi/repository/EventRepository.java
package com.jobscatch.careernavi.repository;

import com.jobscatch.careernavi.domain.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
