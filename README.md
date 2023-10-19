# Wbms

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## To run Swagger-api locally, Only works for individual services.  
Change the port number accordingly to the service port number.  
http://localhost:8081/swagger-ui/index.html for booking  
http://localhost:8082/swagger-ui/index.html for workspace  

## To build Docker image  
Run docker build -t repository-name:tag .  
Below are the naming that I used - Bryan  
e.g docker build -t wbms-service-discovery-docker:service-discovery-docker .  
e.g docker build -t wbms-workspace-docker:workspace-docker .  
e.g docker build -t wbms-booking-docker:booking-docker .  

## To run docker image  
Run docker run -p portnumber -d repository-name:tag  
Below are the naming that I used - Bryan  
To run multiple containers at once the port numbers has to be different  
e.g docker run -p 8761:8761 -d wbms-service-discovery-docker:service-discovery-docker  
e.g docker run -p 8081:8081 -d wbms-workspace-docker:workspace-docker  
e.g docker run -p 8082:8082 -d wbms-booking-docker:booking-docker  

## To run the microservices
1. Run the service-discovery application  
2. Then go to http//localhost:8761 to check if Spring Eureka is running correctly  
3. Run the other services applications, through docker or intellij or cmd
4. Check if the booking-service and workspace-service instances appears under Intances curently registered with Eureka
5. If the status is UP(1) then its running already. And the services are able to communicate with each other.

