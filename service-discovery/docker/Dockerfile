FROM openjdk:17
WORKDIR /app
COPY ../../target/wbms-service-discovery.jar .
EXPOSE 8761
ENTRYPOINT ["java", "-jar", "wbms-service-discovery.jar"]
