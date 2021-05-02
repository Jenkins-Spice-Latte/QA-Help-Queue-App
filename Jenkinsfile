pipeline {
    agent any
    stages {
        stage("Agent: Test VM") {
            agent {
                label "testvm"
            }

            stages {
                stage("Clean Workspace") {
                    steps {
                        cleanWs()
                        sh "docker system prune --force --all --volumes"
                    }
                }

                stage("Code Checkout") {
                    steps {
                        checkout([
                                $class           : "GitSCM",
                                branches         : [[name: "${env.BRANCH_NAME}"]],
                                userRemoteConfigs: [[credentialsId: 'GITHUB_ACCESS_TOKEN', url: "${env.GIT_URL}"]]
                        ])
                    }
                }

                stage("Backend Microservices") {
                    when {
                        anyOf {
                            branch 'main';
                            branch 'dev';
                            branch pattern: "*backend*", comparator: "GLOB"
                        }
                    }

                    environment {
                        BUILD_VERSION_ID = "PROD.1.0.${BUILD_NUMBER}"
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=${BUILD_VERSION_ID}"
                        MVN_INSTALL = "mvn clean install -Dmaven.test.skip=true"
                        RUN_BUILD = "${SET_ARTIFACT_VER} && ${MVN_INSTALL}"

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
                                        sh "mvn test"
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
                            stage("Create Container Images") {
                                environment {
                                    DOCKERIZED_NAME = "${MICROSERVICE_NAME == "CreateTicket" ? "createticket" :  MICROSERVICE_NAME == "ReadTicket" ? "readticket" : MICROSERVICE_NAME == "UpdateTicket" ? "updateticket" : MICROSERVICE_NAME == "DeleteTicket" ? "deleteticket" : null}"
                                    MICROSERVICE_NAME_WITH_DASH = "${MICROSERVICE_NAME == "CreateTicket" ? "create-ticket" :  MICROSERVICE_NAME == "ReadTicket" ? "read-ticket" : MICROSERVICE_NAME == "UpdateTicket" ? "update-ticket" : MICROSERVICE_NAME == "DeleteTicket" ? "delete-ticket" : null}"
                                    EXPOSED_PORT = "${MICROSERVICE_NAME == "CreateTicket" ? "8901" :  MICROSERVICE_NAME == "ReadTicket" ? "8902" : MICROSERVICE_NAME == "UpdateTicket" ? "8903" : MICROSERVICE_NAME == "DeleteTicket" ? "8904" : null}"
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
                                                    usernameVariable: 'USERNAME',
                                                    passwordVariable: 'PASSWORD'
                                            )]) {
                                                sh "docker tag hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID} ${ORG_NAME}/${IMAGE_IDENTIFIER}"
                                                sh "docker login -u ${USERNAME} -p ${PASSWORD}"
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