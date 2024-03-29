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
            when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
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
                stage("Backend Microservices Testing") {
                    // only runs if branch is backend, main, or dev.
                    when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
                    steps {
                        script {
                            MICROSERVICE_LIST.each { MICROSERVICE_NAME ->
                                stage("Inject testing application.properties") {
                                    withCredentials([file(credentialsId: "${MICROSERVICE_NAME}_test", variable: 'application_properties')]) {
                                        sh "rm -f backend/${MICROSERVICE_NAME}/src/main/resources/application-prod.properties"
                                        sh "cp \$application_properties backend/${MICROSERVICE_NAME}/src/main/resources/application-prod.properties"
                                    }
                                }
                                stage("Testing ${MICROSERVICE_NAME}") {
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
                        }
                    }
                }
                stage("Build Artifact, Push to Dockerhub") {
                    when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*backend*", comparator: "GLOB" } }
                    environment {
                        // sets the artifact (.jar) version to increment according to build number.
                        BUILD_VERSION_ID = "1.0.${BUILD_NUMBER}PROD"
                        SET_ARTIFACT_VER = "mvn versions:set -DnewVersion=${BUILD_VERSION_ID}"
                        // clean install command that lets us test first, and then skip test during build.
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
                            stage("Inject production application.properties") {
                                steps {
                                    withCredentials([file(credentialsId: "${MICROSERVICE_NAME}", variable: 'application_properties')]) {
                                        sh "rm -f backend/${MICROSERVICE_NAME}/src/main/resources/application-prod.properties"
                                        sh "cp \$application_properties backend/${MICROSERVICE_NAME}/src/main/resources/application-prod.properties"
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
                            stage("Create and Push Container Images") {
                                environment {
                                    // conditionals to set variable depending on microservice name (a very hacky way - jenkins declarative pipeline limitation).
                                    DOCKERIZED_NAME = "${MICROSERVICE_NAME == "CreateTicket" ? "createticket" : MICROSERVICE_NAME == "ReadTicket" ? "readticket" : MICROSERVICE_NAME == "UpdateTicket" ? "updateticket" : MICROSERVICE_NAME == "DeleteTicket" ? "deleteticket" : null}"
                                    MICROSERVICE_NAME_WITH_DASH = "${MICROSERVICE_NAME == "CreateTicket" ? "create-ticket" : MICROSERVICE_NAME == "ReadTicket" ? "read-ticket" : MICROSERVICE_NAME == "UpdateTicket" ? "update-ticket" : MICROSERVICE_NAME == "DeleteTicket" ? "delete-ticket" : null}"
                                    // docker image information.
                                    IMAGE_IDENTIFIER = "hq-backend-${DOCKERIZED_NAME}:${BUILD_VERSION_ID}"
                                    JAR_NAME = "${MICROSERVICE_NAME_WITH_DASH}-${BUILD_VERSION_ID}"
                                }
                                steps {
                                    dir("backend/") {
                                        // builds image - sends args to Dockerfile.
                                        sh "docker build ${MICROSERVICE_NAME} -t manishreddy1/hq-backend-${DOCKERIZED_NAME}:latest"

                                        withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_LOGIN', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                                            // pushes to dockerhub
                                            sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
                                            sh "docker image push manishreddy1/hq-backend-${DOCKERIZED_NAME}:latest"
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

        // stage("Test Frontend"){
        //     steps{
        //         dir("Frontend/React/queue"){

        //             sh "curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -"
        //             sh "sudo apt install nodejs"
        //             sh "npm install"
        //             sh "npm test -- --coverage --watchAll=false"
        //         }
        //     }
        // }

        stage("Build Frontend, Push to Dockerhub"){
            steps{
                //when { anyOf { branch 'main'; branch 'dev'; branch pattern: "*frontend*", comparator: "GLOB" } }
                // build frontend image
                sh "docker build Frontend/React/queue -t manishreddy1/hq-frontend:latest"

                withCredentials([usernamePassword(credentialsId: 'DOCKERHUB_LOGIN', usernameVariable: 'DOCKERHUB_USER', passwordVariable: 'DOCKERHUB_PASS')]) {
                    // login and push to dockerhub
                    sh 'docker login -u $DOCKERHUB_USER -p $DOCKERHUB_PASS'
                    sh "docker image push manishreddy1/hq-frontend:latest"
                }
            }
        }


        stage("Create EKS Cluster"){
            steps{
                dir("k8s_scripts"){
                    sh "bash install-eksctl.sh"
                    sh "bash createCluster.sh"
                }
            }
        }

        stage("Apply Kubernetes files"){
            steps{
                dir("k8s_scripts"){
                    sh "kubectl apply -f nginx_config.yaml"
                    sh "kubectl apply -f nginx.yaml"

                    sh "kubectl apply -f backend_createticket.yaml -f backend_readticket.yaml -f backend_updateticket.yaml -f backend_deleteticket.yaml"

                    sh "kubectl apply -f frontend.yaml"

                    sh "kubectl rollout restart deployment create"
                    sh "kubectl rollout restart deployment read"
                    sh "kubectl rollout restart deployment update"
                    sh "kubectl rollout restart deployment delete"
                    sh "kubectl rollout restart deployment nginx"
                    sh "kubectl rollout restart deployment frontend"
                }
            }
        }
    }
            
}