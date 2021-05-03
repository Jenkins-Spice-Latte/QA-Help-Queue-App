
FROM openjdk:11

# arg file gets passed in during build.
# springboot jar file in this case.
ARG JAR_FILE

# use   --env "VARIABLE1=abcdefg"   at runtime.
ENV RDS_ENDPOINT=$RDS_ENDPOINT
ENV RDS_USERNAME=$RDS_USERNAME
ENV RDS_PASSWORD=$RDS_PASSWORD

ENV EXPOSED_PORT=$EXPOSED_PORT

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