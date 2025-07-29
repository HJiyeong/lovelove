package com.jobscatch.careernavi.repository;

import com.jobscatch.careernavi.domain.TestSession;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TestSessionRepository extends JpaRepository<TestSession, Long> {
    List<TestSession> findByUserId(String userId);
}
