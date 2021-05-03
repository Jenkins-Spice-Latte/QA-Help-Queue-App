
FROM openjdk:11

ARG JAR_FILE
ARG EXPOSED_PORT

ARG RDS_ENDPOINT
ARG RDS_USERNAME
ARG RDS_PASSWORD

COPY $JAR_FILE app.jar

ENTRYPOINT java -jar /app.jar \
-Dspring-boot.run.arguments= \
--spring.profiles.active=prod \
--spring.data.rest.base-path=/api \
--spring.datasource.initialization-mode=always \
--spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver \
--spring.datasource.url=jdbc:mysql://$RDS_ENDPOINT/proddb \
--spring.jpa.hibernate.ddl-auto=update \
--spring.jpa.show-sql=true \
-Dspring.datasource.username=$RDS_USERNAME \
-Dspring.datasource.password=$RDS_PASSWORD

EXPOSE $EXPOSED_PORT