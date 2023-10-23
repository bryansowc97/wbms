FROM openjdk:17
WORKDIR /app
COPY ./booking/target/wbms-booking.jar .
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "wbms-booking.jar"]
