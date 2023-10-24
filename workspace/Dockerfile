FROM openjdk:17
WORKDIR /app
COPY target/wbms-workspace.jar /app/wbms-workspace.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "wbms-workspace-service.jar"]
