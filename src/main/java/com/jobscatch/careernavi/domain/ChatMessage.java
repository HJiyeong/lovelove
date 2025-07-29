package com.jobscatch.careernavi.domain;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class ChatMessage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sessionId;

    private String role;    // "user" 또는 "ai" (누가 보냈는지)

    @Column(columnDefinition = "TEXT")
    private String message; // 채팅 내용

    private String createdAt; // 생성 시각 (string으로 간단 처리)

    public ChatMessage(String sessionId, String role, String message, String createdAt) {
        this.sessionId = sessionId;
        this.role = role;
        this.message = message;
        this.createdAt = createdAt;
    }

}
