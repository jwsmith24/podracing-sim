# build stage
FROM gradle:8.7-jdk21 AS build
WORKDIR /app

COPY build.gradle.kts settings.gradle.kts ./
COPY gradle ./gradle

RUN ./gradlew dependencies || true

COPY . .

RUN ./gradlew clean bootJar --no-daemon

# run stage
FROM eclipse-temurin:21-jdk
WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]