FROM openjdk:21
WORKDIR /app
COPY target/wbms-accounts.jar /app/wbms-workspace.jar
EXPOSE 8082
ENTRYPOINT ["java", "-jar", "wbms-workspace.jar"]
