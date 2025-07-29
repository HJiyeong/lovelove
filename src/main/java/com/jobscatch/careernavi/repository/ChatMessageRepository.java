package com.jobscatch.careernavi.repository;

import com.jobscatch.careernavi.domain.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    /* ✔ 이미 있던 것 */
    List<ChatMessage> findBySessionIdOrderById(String sessionId);
    List<ChatMessage> findTop20BySessionIdOrderByIdAsc(String sessionId);
    List<ChatMessage> findTop20BySessionIdOrderByIdDesc(String sessionId);


    /* ➕ 1) 세션 요약 목록 (최근 대화 순) */
    @Query("""
        SELECT new map(c.sessionId AS sessionId,
                       MAX(c.id)     AS lastId)
          FROM ChatMessage c
      GROUP BY c.sessionId
      ORDER BY MAX(c.id) DESC
    """)
    List<Map<String,Object>> findSessionsSummary();

    /* ➕ 2) 특정 세션의 마지막 메시지 한 건 */
    ChatMessage findTop1BySessionIdOrderByIdDesc(String sessionId);
}


