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

                stage("Tests, Coverage, Create JARs") {
                    when {
                        anyOf {
                            branch 'main';
                            branch 'dev';
                            branch pattern: "*backend*", comparator: "GLOB"
                        }
                    }

                    environment {
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=PROD.1.0.${BUILD_NUMBER}"
                        MVN_INSTALL = "mvn clean install -Dmaven.test.skip=true"
                        RUN_BUILD = "${SET_ARTIFACT_VER} && ${MVN_INSTALL}"
                    }

                    matrix {
                        axes {
                            axis {
                                name "MICROSERVICE_NAME"
                                values "CreateTicket", "ReadTicket", "UpdateTicket", "DeleteTicket"
                            }
                        }

                        stages {
                            stage("Backend Microservices") {
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
                        }
                    }
                }

                stage("Archive JAR Artifacts") {
                    steps {
                        archiveArtifacts artifacts: 'backend/**/target/*.jar', fingerprint: true
                    }
                }

                stage("Build Container Images") {
                    steps {
                        sh "echo 'containerise command placeholder'"
                    }

                }
            }

            post {
                // Clean after build
                always {
                    cleanWs()
                }
            }
        }
    }
}