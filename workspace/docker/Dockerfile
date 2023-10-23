FROM openjdk:17
WORKDIR /app
COPY ./workspace/target/wbms-workspace.jar .
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "wbms-workspace.jar"]
