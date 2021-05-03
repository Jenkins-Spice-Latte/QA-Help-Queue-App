pipeline {
    agent any
    stages {
        stage("Agent: Test VM") {
            // sets to run on the testvm node.
            agent {
                label "testvm"
            }

            stages {
                stage("Clean Workspace") {
                    steps {
                        // cleans workspace before starting.
                        cleanWs()
                        // removes all remaining docker images.
                        sh "docker system prune --force --all --volumes"
                    }
                }

                stage("Code Checkout") {
                    steps {
                        // gets the source code of the branch & repo where the Jenkinsfile is located.
                        checkout([
                                $class           : "GitSCM",
                                branches         : [[name: "${env.BRANCH_NAME}"]],
                                userRemoteConfigs: [[credentialsId: 'GITHUB_ACCESS_TOKEN', url: "${env.GIT_URL}"]]
                        ])
                    }
                }

                stage("Backend Microservices") {
                    // only runs if branch is backend, main, or dev.
                    when {
                        anyOf {
                            branch 'main';
                            branch 'dev';
                            // checks for branches with the word 'backend'.
                            branch pattern: "*backend*", comparator: "GLOB"
                        }
                    }

                    environment {
                        // sets the artifact (.jar) version to increment according to build number.
                        BUILD_VERSION_ID = "PROD.1.0.${BUILD_NUMBER}"
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=${BUILD_VERSION_ID}"
                        // clean install command that lets us test first, and then skip test during build.
                        MVN_INSTALL = "mvn clean install -Dmaven.test.skip=true"
                        RUN_BUILD = "${SET_ARTIFACT_VER} && ${MVN_INSTALL}"
                        // application.properties file with
                        PROPERTIES_DATA_REST_BASE = "--spring.data.rest.base-path=/api"
                        PROPERTIES_INITIALIZATION_MODE = "--spring.datasource.initialization-mode=always"
                        PROPERTIES_DRIVER_CLASS = "--spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver"
                        PROPERTIES_DATASOURCE_URL = "--spring.datasource.url=jdbc:mysql://${TEST_RDS_ENDPOINT}/testdb" ///////GETTING NULL ERROR
                        JPA_HIBERNATE_DDL = "--spring.jpa.hibernate.ddl-auto=update"
                        JPA_SHOW_SQL_BOOL = "--spring.jpa.show-sql=true"


                        TEST_APPLICATION_PROPERTIES = "-Dspring-boot.run.arguments='" +
                                "${PROPERTIES_DATA_REST_BASE} " +
                                "${PROPERTIES_INITIALIZATION_MODE} " +
                                "${PROPERTIES_DRIVER_CLASS} " +
                                "${PROPERTIES_DATASOURCE_URL} " +
                                "${JPA_HIBERNATE_DDL} " +
                                "${JPA_SHOW_SQL_BOOL}'"
                    }

                    matrix {
                        axes {
                            axis {
                                name "MICROSERVICE_NAME"
                                values "CreateTicket",
                                        "ReadTicket",
                                        "UpdateTicket",
                                        "DeleteTicket"
                            }
                        }
                        stages {
                            stage("Testing") {
                                steps {
                                    echo "${MICROSERVICE_NAME}"
                                    dir("backend/${MICROSERVICE_NAME}") {
                                        withCredentials([usernamePassword(
                                                credentialsId: 'TEST_RDS_CREDENTIALS',
                                                usernameVariable: 'TEST_RDS_USR',
                                                passwordVariable: 'TEST_RDS_PWD'
                                        )]) {
                                            sh "mvn test ${TEST_APPLICATION_PROPERTIES} " +
                                                    "-Dspring.datasource.username=${TEST_RDS_USR} " +
                                                    "-Dspring.datasource.password=${TEST_RDS_PWD}"
                                        }
                                        jacoco(
                                                execPattern: "**/target/*.exec",
                                                classPattern: "**/target/classes",
                                                sourcePattern: "/src/main/java",
                                                exclusionPattern: "/src/test*"
                                        )
                                        publishHTML([allowMissing         : true,
                                                     alwaysLinkToLastBuild: false,
                                                     keepAll              : false,
                                                     reportDir            : "./target/site/jacoco/",
                                                     reportFiles          : "index.html",
                                                     reportName           : "${MICROSERVICE_NAME} Results Report",
                                                     reportTitles         : "${MICROSERVICE_NAME} Test Results"
                                        ])
                                    }
                                }
                            }

                            stage("Build JAR Files") {
                                steps {
                                    echo "${MICROSERVICE_NAME}"
                                    dir("backend/${MICROSERVICE_NAME}") {
                                        sh "${RUN_BUILD}"
                                    }
                                }
                            }

                            stage("Create & Push Container Images") {
                                environment {
                                    DOCKERIZED_NAME = "${MICROSERVICE_NAME == "CreateTicket" ? "createticket" : MICROSERVICE_NAME == "ReadTicket" ? "readticket" : MICROSERVICE_NAME == "UpdateTicket" ? "updateticket" : MICROSERVICE_NAME == "DeleteTicket" ? "deleteticket" : null}"
                                    MICROSERVICE_NAME_WITH_DASH = "${MICROSERVICE_NAME == "CreateTicket" ? "create-ticket" : MICROSERVICE_NAME == "ReadTicket" ? "read-ticket" : MICROSERVICE_NAME == "UpdateTicket" ? "update-ticket" : MICROSERVICE_NAME == "DeleteTicket" ? "delete-ticket" : null}"
                                    EXPOSED_PORT = "${MICROSERVICE_NAME == "CreateTicket" ? "8901" : MICROSERVICE_NAME == "ReadTicket" ? "8902" : MICROSERVICE_NAME == "UpdateTicket" ? "8903" : MICROSERVICE_NAME == "DeleteTicket" ? "8904" : null}"
                                    ORG_NAME = "jenkinsspicelatte"
                                    IMAGE_IDENTIFIER = "hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID}"
                                    JAR_NAME = "${MICROSERVICE_NAME_WITH_DASH}-${BUILD_VERSION_ID}"
                                }

                                steps {

                                    echo "${MICROSERVICE_NAME} -> ${IMAGE_IDENTIFIER}"
                                    script {
                                        dir("backend/") {

                                            sh "docker build -t " +
                                                    "${IMAGE_IDENTIFIER} " +
                                                    "--build-arg JAR_FILE='/${MICROSERVICE_NAME}/target/${JAR_NAME}.jar' " + // create-ticket-PROD.1.0.149.jar
                                                    "--build-arg EXPOSED_PORT=${EXPOSED_PORT} " +
                                                    "-f Dockerfile ."

                                            withCredentials([usernamePassword(
                                                    credentialsId: 'DOCKERHUB_LOGIN',
                                                    usernameVariable: 'DOCKERHUB_USER',
                                                    passwordVariable: 'DOCKERHUB_PASS'
                                            )]) {
                                                sh "docker tag hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID} ${ORG_NAME}/${IMAGE_IDENTIFIER}"
                                                sh "docker login -u ${DOCKERHUB_USER} -p ${DOCKERHUB_PASS}"
                                                sh "docker image push ${ORG_NAME}/${IMAGE_IDENTIFIER}"
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }

                stage("Archive JAR Artifacts") {
                    steps {
                        archiveArtifacts artifacts: 'backend/**/target/*.jar', fingerprint: true
                    }
                }

            }

            post {
                always {
                    sh "docker system prune --force --all --volumes"
                    sh "docker logout"
                    cleanWs()
                }
            }
        }
    }
}