package com.jobscatch.careernavi.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
             .allowedOrigins(
                "http://localhost:5173",         // 개발용
                "https://www.careernavi.kr"      // 배포용
            )
                .allowedMethods("GET", "POST", "OPTIONS", "DELETE", "PUT")
                .allowCredentials(true);
    }
}
