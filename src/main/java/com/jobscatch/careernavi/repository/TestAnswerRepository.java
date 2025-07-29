package com.jobscatch.careernavi.repository;

import com.jobscatch.careernavi.domain.TestAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TestAnswerRepository extends JpaRepository<TestAnswer, Long> {
    List<TestAnswer> findBySessionId(Long sessionId);

}
