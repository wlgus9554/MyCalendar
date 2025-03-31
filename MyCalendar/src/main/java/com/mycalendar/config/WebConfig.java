package com.mycalendar.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    // 🔹 정적 리소스 매핑 추가
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 예: http://localhost:8080/upload/member/xxx.jpg 요청이
        //     실제 파일 C:/PJH/workspace/Spring boot/MyCalendar/upload/member/xxx.jpg 로 매핑됨
        registry.addResourceHandler("/upload/**")
                .addResourceLocations("file:///C:/PJH/workspace/Spring%20boot/MyCalendar/upload/");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // 모든 경로
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowCredentials(true); // ✅ 세션 쿠키 허용!
    }
}
