FROM openjdk:21
WORKDIR /app
COPY target/wbms-accounts.jar /app/wbms-accounts.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "wbms-accounts.jar"]
