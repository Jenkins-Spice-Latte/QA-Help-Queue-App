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
                                branches         : [[name: "frontend-backend"]],
                                userRemoteConfigs: [[url: "https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App"]]
                        ])
                    }
                }

                stage("Backend Tests and Coverage") {
                    parallel {
                        stage("CreateTicket Test") {
                            environment {
                                MICROSERVICE_NAME = 'CreateTicket'
                            }
                            steps {
                                dir("backend/${MICROSERVICE_NAME}") {
                                    sh "mvn test"
                                    step([$class          : "JacocoPublisher",
                                          execPattern     : "**/target/*.exec",
                                          classPattern    : "**/target/classes",
                                          sourcePattern   : "/src/main/java",
                                          exclusionPattern: "/src/test*"
                                    ])

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
                                    step([$class          : "JacocoPublisher",
                                          execPattern     : "**/target/*.exec",
                                          classPattern    : "**/target/classes",
                                          sourcePattern   : "/src/main/java",
                                          exclusionPattern: "/src/test*"
                                    ])

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
                                    step([$class          : "JacocoPublisher",
                                          execPattern     : "**/target/*.exec",
                                          classPattern    : "**/target/classes",
                                          sourcePattern   : "/src/main/java",
                                          exclusionPattern: "/src/test*"
                                    ])

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
                                    step([$class          : "JacocoPublisher",
                                          execPattern     : "**/target/*.exec",
                                          classPattern    : "**/target/classes",
                                          sourcePattern   : "/src/main/java",
                                          exclusionPattern: "/src/test*"
                                    ])

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
            }


            post {
                // Clean after build
                always { cleanWs() }
            }
        }
    }
}