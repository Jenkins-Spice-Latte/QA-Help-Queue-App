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

                stage("Tests, Coverage, Create JARs") {
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
                                values "CreateTicket"//, "ReadTicket", "UpdateTicket", "DeleteTicket" //RE-ENABLE THIS LATER
                            }
                        }
                        //RE-ENABLE THIS LATER
                        stages {
//                            stage("Backend Microservices") {
//                                steps {
//                                    echo "${MICROSERVICE_NAME}"
//                                    dir("backend/${MICROSERVICE_NAME}") {
//                                        sh "mvn test"
//                                        jacoco(
//                                                execPattern: "**/target/*.exec",
//                                                classPattern: "**/target/classes",
//                                                sourcePattern: "/src/main/java",
//                                                exclusionPattern: "/src/test*"
//                                        )
//                                        publishHTML([allowMissing         : true,
//                                                     alwaysLinkToLastBuild: false,
//                                                     keepAll              : false,
//                                                     reportDir            : "./target/site/jacoco/",
//                                                     reportFiles          : "index.html",
//                                                     reportName           : "${MICROSERVICE_NAME} Results Report",
//                                                     reportTitles         : "${MICROSERVICE_NAME} Test Results"
//                                        ])
//                                    }
//                                }
//                            }

                            stage("Build JAR Files") {
                                steps {
                                    echo "${MICROSERVICE_NAME}"
                                    dir("backend/${MICROSERVICE_NAME}") {
                                        sh "${RUN_BUILD}"
                                    }
                                }
                            }
//                              could make this outside of matrix stage and create new matrix
                            stage("Build Container Images") {
                                steps {
                                    script {
                                        dir("backend/") {
                                            sh "docker build -t " +
                                                    "dockertest:${BUILD_VERSION_ID} " +
                                                    "--build-arg JAR_FILE='/${MICROSERVICE_NAME}/target/*.jar' " +
                                                    "--build-arg EXPOSED_PORT=9991 " +
                                                    "-f Dockerfile ."

                                            withCredentials([usernamePassword(
                                                    credentialsId: 'DOCKERHUB_LOGIN',
                                                    usernameVariable: 'USERNAME',
                                                    passwordVariable: 'PASSWORD'
                                            )]) {
                                                sh "docker tag dockertest:${BUILD_VERSION_ID} ${USERNAME}/dockertest:${BUILD_VERSION_ID}"
                                                sh "docker login -u ${USERNAME} -p ${PASSWORD}"
                                                sh "docker image push ${USERNAME}/dockertest:${BUILD_VERSION_ID}"
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

//                stage("Build Container Images") {
//                    steps {
//                        script {
//                            docker.build('demo')
////                            The important thing here is that the image name must match the name of the repository you created in ECR.
//                        }
//                    }
//                }
            }

            post {
                // Clean after build
                always {
                    sh "docker system prune --force --all --volumes"
                    sh "docker logout"
                    cleanWs()
                }
            }
        }
    }
}