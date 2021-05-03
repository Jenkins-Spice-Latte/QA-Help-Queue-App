pipeline {
    options {
        // only allowing 1 build at a time for each branch.
        disableConcurrentBuilds()
        //fail the pipeline after 30 min
        timeout(time: 30, unit: 'MINUTES')
    }
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
                        // overrides application.properties file data.
                        SPRING_PROFILES_ACTIVE = "spring.profiles.active=real_test"
                        PROPERTIES_DATA_REST_BASE = "--spring.data.rest.base-path=/api"
                        PROPERTIES_INITIALIZATION_MODE = "--spring.datasource.initialization-mode=always"
                        PROPERTIES_DRIVER_CLASS = "--spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver"
                        PROPERTIES_DATASOURCE_URL = '--spring.datasource.url=jdbc:mysql://$TEST_RDS_ENDPOINT/testdb'
                        JPA_HIBERNATE_DDL = "--spring.jpa.hibernate.ddl-auto=update"
                        JPA_SHOW_SQL_BOOL = "--spring.jpa.show-sql=true"
                        // combines all into one argument.
                        TEST_APPLICATION_PROPERTIES = "-Dspring-boot.run.arguments='" +
                                "${SPRING_PROFILES_ACTIVE} " +
                                "${PROPERTIES_DATA_REST_BASE} " +
                                "${PROPERTIES_INITIALIZATION_MODE} " +
                                "${PROPERTIES_DRIVER_CLASS} " +
                                "${PROPERTIES_DATASOURCE_URL} " +
                                "${JPA_HIBERNATE_DDL} " +
                                "${JPA_SHOW_SQL_BOOL}'"
                    }
                    // matrix used to parallelize stages for each microservice.
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
                                        // gets the test database username and password from jenkins secrets.
                                        withCredentials([usernamePassword(
                                                credentialsId: 'TEST_RDS_CREDENTIALS',
                                                usernameVariable: 'TEST_RDS_USR',
                                                passwordVariable: 'TEST_RDS_PWD'
                                        )]) {
                                            // runs maven test
                                            sh "mvn test ${TEST_APPLICATION_PROPERTIES} " +
                                                    '-Dspring.datasource.username=$TEST_RDS_USR ' +
                                                    '-Dspring.datasource.password=$TEST_RDS_PWD'
                                        }
                                        // generates test coverage.
                                        jacoco(
                                                execPattern: "**/target/*.exec",
                                                classPattern: "**/target/classes",
                                                sourcePattern: "/src/main/java",
                                                exclusionPattern: "/src/test*"
                                        )
                                        sh "pwd"
                                        sh "mkdir -p ../allTestCov/${MICROSERVICE_NAME}"
                                        sh "cp -a target/site/jacoco/ ../allTestCov/${MICROSERVICE_NAME}"
                                        //exports test results back to jenkins for devs.
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
                            // builds jar files by running the command mvn clean install.
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
                                    // conditionals to set variable depending on microservice name (a very hacky way - jenkins declarative pipeline limitation).
                                    DOCKERIZED_NAME = "${MICROSERVICE_NAME == "CreateTicket" ? "createticket" : MICROSERVICE_NAME == "ReadTicket" ? "readticket" : MICROSERVICE_NAME == "UpdateTicket" ? "updateticket" : MICROSERVICE_NAME == "DeleteTicket" ? "deleteticket" : null}"
                                    MICROSERVICE_NAME_WITH_DASH = "${MICROSERVICE_NAME == "CreateTicket" ? "create-ticket" : MICROSERVICE_NAME == "ReadTicket" ? "read-ticket" : MICROSERVICE_NAME == "UpdateTicket" ? "update-ticket" : MICROSERVICE_NAME == "DeleteTicket" ? "delete-ticket" : null}"
                                    EXPOSED_PORT = "${MICROSERVICE_NAME == "CreateTicket" ? "8901" : MICROSERVICE_NAME == "ReadTicket" ? "8902" : MICROSERVICE_NAME == "UpdateTicket" ? "8903" : MICROSERVICE_NAME == "DeleteTicket" ? "8904" : null}"
                                    // docker image information.
                                    ORG_NAME = "jenkinsspicelatte"
                                    IMAGE_IDENTIFIER = "hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID}"
                                    JAR_NAME = "${MICROSERVICE_NAME_WITH_DASH}-${BUILD_VERSION_ID}"
                                }
                                steps {
                                    echo "${MICROSERVICE_NAME} -> ${IMAGE_IDENTIFIER}"
                                    script {
                                        dir("backend/") {
                                            // builds image - sends args to Dockerfile.
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
                                                // pushes to dockerhub
                                                sh "docker tag hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID} ${ORG_NAME}/${IMAGE_IDENTIFIER}"
                                                sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
                                                sh "docker image push ${ORG_NAME}/${IMAGE_IDENTIFIER}"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                // push test results directory to github repo.
                stage("Push Test Results to Github") {
                    steps {
                        dir("backend/allTestCov/") {
                            sh "pwd"
                            sh "git init"
                            sh "git status"
                            sh "git add --all"
                            sh "git status"
                            sh "git config --global user.email 'jacoco-test-coverage@jenkins'"
                            sh "git config --global user.name 'Jenkins'"
                            sh "ls -la"
                            sh "git commit -m 'Test Coverage-PROD.1.0.${BUILD_NUMBER} [${env.BRANCH_NAME}]'"
                            sh "git status"
                            sh "git branch -M main"
                            withCredentials([usernamePassword(
                                    credentialsId: 'GITHUB_MORE_PERMS',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GH_PASS'
                            )]) {
                                sh 'git push -f https://$GH_USER:$GH_PASS@github.com/$GH_USER/supreme-disco main'
                            }
                        }
                    }
                }
                // saves .jar files as jenkins artifacts.
                stage("Archive JAR Artifacts") {
                    steps {
                        archiveArtifacts artifacts: 'backend/**/target/*.jar', fingerprint: true
                    }
                }
            }
            post {
                always {
                    // clean workspace even after a failure.
                    sh "docker system prune --force --all --volumes"
                    sh "docker logout"
                    cleanWs()
                }
            }
        }
    }
}