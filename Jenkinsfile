String[] MICROSERVICE_LIST = ['CreateTicket', 'ReadTicket', 'UpdateTicket', 'DeleteTicket']

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
            agent { label "testvm" }
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
                    //when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
                    environment {
                        // sets the artifact (.jar) version to increment according to build number.
                        BUILD_VERSION_ID = "1.0.${BUILD_NUMBER}PROD"
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=${BUILD_VERSION_ID}"
                        // clean install command that lets us test first, and then skip test during build.
                        MVN_INSTALL = "mvn clean install -Dmaven.test.skip=true"
                        RUN_BUILD = "${SET_ARTIFACT_VER} && ${MVN_INSTALL}"
                    }

                    
                    // matrix used to parallelize stages for each microservice.
                    steps{
                        script{
                            for(MICROSERVICE_NAME in MICROSERVICE_LIST) {
                                stages {
                                    stage("Deposit application.properties"){
                                        steps{
                                            withCredentials([file(credentialsId: "${MICROSERVICE_NAME}", variable: 'application_properties')]){
                                                sh "cp \$application_properties backend/${MICROSERVICE_NAME}/src/main/resources/application-prod.properties"
                                            }
                                        }
                                    }


                                    stage("Testing") {
                                        steps {
                                            echo "${MICROSERVICE_NAME}"
                                            dir("backend/${MICROSERVICE_NAME}") {
                                                // runs maven test
                                                sh "mvn clean test"

                                                // generates test coverage.
                                                jacoco(
                                                    execPattern: "**/target/*.exec",
                                                    classPattern: "**/target/classes",
                                                    sourcePattern: "/src/main/java",
                                                    exclusionPattern: "/src/test*"
                                                )


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
                                                            "--build-arg JAR_FILE='/${MICROSERVICE_NAME}/target/${JAR_NAME}.jar' " +
                                                            "-f ../docker/Dockerfile.backend ."
                                                    // all the other arguments (ENV) in dockerfile are input at runtime.
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
                }
                    }
                


                // push test results directory to github repo.
                stage("Push Test Results to Github") {
                    when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
                    steps {
                        dir("backend/allTestCov/") {
                            // creating main index file so developer can access the other coverage reports
                            sh "echo '<h2>Test Coverage " +
                                    "Version: 1.0.${BUILD_NUMBER}PROD " +
                                    "Commit: ${GIT_COMMIT}</h2>" +
                                    "<p><a href='CreateTicket/jacoco/index.html'>CreateTicket Coverage</a></p> " +
                                    "<p><a href='ReadTicket/jacoco/index.html'>ReadTicket Coverage</a></p> " +
                                    "<p><a href='UpdateTicket/jacoco/index.html'>UpdateTicket Coverage</a></p> " +
                                    "<p><a href='UpdateTicket/jacoco/index.html'>DeleteTicket Coverage</a></p>' > index.html"
                            sh "git init"
                            sh "git add --all"
                            sh "git config --global user.email 'jenkins@jenkins-spice-latte'"
                            sh "git config --global user.name 'Jenkins'"
                            sh "git commit -m 'Test Coverage-1.0.${BUILD_NUMBER}PROD [${env.BRANCH_NAME}]'"
                            sh "git branch -M test-coverage"
                            withCredentials([usernamePassword(
                                    credentialsId: 'GITHUB_MORE_PERMS',
                                    usernameVariable: 'GH_USER',
                                    passwordVariable: 'GH_PASS'
                            )]) {
                                sh 'git push -f https://$GH_USER:$GH_PASS@github.com/Jenkins-Spice-Latte/QA-Help-Queue-App test-coverage' //TODO: change
                            }
                        }
                    }
                }
                // saves .jar files as jenkins artifacts.
                stage("Archive JAR Artifacts") {
                    when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
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
        //TODO: add conditional to check if branch name contains frontend, main, or dev.
        //TODO: frontend testing.
        //TODO: frontend build package (npm?).
        //TODO: create frontend image using dockerfile.
        //TODO: push frontend container image to dockerhub.
        //TODO: push frontend test results to github.
        //TODO: archive frontend npm package.
        //TODO: clean workspace.
        //TODO: change node to kubernetes cluster (or maybe just run kubectl commands using the endpoint?)
        //TODO: use kubernetes yaml files to run containers (where does dockercompose come into this?)
    }
}