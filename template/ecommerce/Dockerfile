FROM node:21 AS ng-builder

RUN npm i -g @angular/cli

WORKDIR /ngapp

COPY client/package*.json .
COPY client/angular.json .
COPY client/tsconfig.* .
COPY client/src src

RUN npm ci && ng build

# Starting with this Linux server
FROM maven:3-eclipse-temurin-21 AS sb-builder

WORKDIR /sbapp

# everything after this is in /sbapp
COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src

COPY --from=ng-builder /ngapp/dist/client-side /src/main/resources/static

# Build the application
RUN mvn package -Dmaven.test.skip=true

FROM openjdk:21-jdk-bullseye

WORKDIR /app 

COPY --from=sb-builder /sbapp/target/ecommerce-0.0.1-SNAPSHOT.jar app.jar

## Run the application
# Define environment variable 
ENV PORT=8080 

# Expose the port
EXPOSE ${PORT}

#place any access key variables here
ENV SPRING_DATA_MONGODB_URI=

# Run the program
ENTRYPOINT SERVER_PORT=${PORT} java -jar app.jar