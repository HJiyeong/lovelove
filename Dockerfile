# Gradle 빌드 도구용 이미지
FROM gradle:8.4.0-jdk17 AS builder
WORKDIR /app
COPY . .
RUN gradle build -x test

# 실행용 이미지
FROM openjdk:17
WORKDIR /app
COPY --from=builder /app/build/libs/career-navi-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
