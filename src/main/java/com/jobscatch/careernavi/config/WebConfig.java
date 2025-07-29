// package com.jobscatch.careernavi.config;

// import org.springframework.context.annotation.Configuration;
// import org.springframework.web.servlet.config.annotation.*;

// @Configuration
// public class WebConfig implements WebMvcConfigurer {
//     @Override
//     public void addCorsMappings(CorsRegistry registry) {
//         registry.addMapping("/api/**")
//              .allowedOrigins(
//                 "http://localhost:5173",         // 개발용
//                 "https://www.careernavi.kr"      // 배포용
//             )
//                 .allowedMethods("GET", "POST", "OPTIONS", "DELETE", "PUT")
//                 .allowCredentials(true);
//     }
// }


// WebConfig.java
package com.jobscatch.careernavi.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**") // 모든 경로
                        .allowedOrigins("http://localhost:5173") // 프론트 주소
                        .allowedMethods("*") // GET, POST 등
                        .allowedHeaders("*");
            }
        };
    }
}
