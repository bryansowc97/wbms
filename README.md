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
http://localhost:8080/swagger-ui/index.html

## To build Docker image
Run docker build -t repository-name:tag .
Below are the naming that I used - Bryan
e.g docker build -t wbms-accounts-docker:accounts-docker .
e.g docker build -t wbms-workspace-docker:workspace-docker .
e.g docker build -t wbms-booking-docker:booking-docker .

## To run docker image
Run docker run -p portnumber -d repository-name:tag
Below are the naming that I used - Bryan
To run multiple containers at once the port numbers has to be different 
eg. docker run -p 8080:8080 -d wbms-accounts-docker:accounts-docker
eg. docker run -p 8081:8081 -d wbms-workspace-docker:workspace-docker
eg. docker run -p 8082:8082 -d wbms-booking-docker:booking-docker
