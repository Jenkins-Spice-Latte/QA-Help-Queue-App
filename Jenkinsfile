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

                stage("Tests and Coverage") {
                    parallel {
                        stage("CreateTicket Test") {
                            environment {
                                MICROSERVICE_NAME = 'CreateTicket'
                            }
                            steps {
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


                        stage("ReadTicket Test") {
                            environment {
                                MICROSERVICE_NAME = 'ReadTicket'
                            }
                            steps {
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

                        stage("UpdateTicket Test") {
                            environment {
                                MICROSERVICE_NAME = 'UpdateTicket'
                            }
                            steps {
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

                        stage("DeleteTicket Test") {
                            environment {
                                MICROSERVICE_NAME = 'DeleteTicket'
                            }
                            steps {
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


                    }
                }

                stage("Build JAR Files") {
                    environment {
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=1.${BUILD_NUMBER}-PRODUCTION"
                        MVN_INSTALL = "mvn clean install -Dmaven.test.skip=true"
                        RUN_BUILD = "${SET_ARTIFACT_VER} && ${MVN_INSTALL}"
                    }
                    parallel {
                        stage("CreateTicket Package") {
                            steps {
                                dir("backend/CreateTicket") {
                                    sh "${RUN_BUILD}"
                                }
                            }
                        }
                        stage("ReadTicket Package") {
                            steps {
                                dir("backend/ReadTicket") {
                                    sh "${RUN_BUILD}"
                                }
                            }
                        }
                        stage("UpdateTicket Package") {
                            steps {
                                dir("backend/UpdateTicket") {
                                    sh "${RUN_BUILD}"
                                }
                            }
                        }
                        stage("DeleteTicket Package") {
                            steps {
                                dir("backend/DeleteTicket") {
                                    sh "${RUN_BUILD}"
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
                // Clean after build
                always {
                    cleanWs()
                }
            }
        }
    }
}