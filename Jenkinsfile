pipeline {
    agent any

    stages {
        stage('Agent: Test VM') {
            agent {
                label 'testvm'
            }

            stages {

                stage('Clean Workspace') {
                    steps {
                        cleanWs()
                    }
                }

//                stage("Clone Repo") {
//                    steps {
//                        git branch: 'frontend-backend', url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App/'
//                    }
//                }

                stage('Code Checkout') {
                    steps {
                        checkout([
                                $class           : 'GitSCM',
                                branches         : [[name: 'frontend-backend']],
                                userRemoteConfigs: [[url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App']]
                        ])
                    }
                }

//                stage('Backend Tests and Coverage') {
//                    parallel {
                stage("CreateTicket Test") {
                    steps {
                        dir('backend/CreateTicket') {
                            sh 'mvn test'
                            step([$class          : 'JacocoPublisher',
                                  execPattern     : '**/target/*.exec',
                                  classPattern    : '**/target/classes',
                                  sourcePattern   : '/src/main/java',
                                  exclusionPattern: '/src/test*'
                            ])
                        }
                    }
//                        }

//                        stage("ReadTicket Test") {
//                            steps {
//                                dir('backend/ReadTicket') {
//                                    sh 'mvn test'
//                                }
//                            }
//                        }
//
//                        stage("UpdateTicket Test") {
//                            steps {
//                                dir('backend/UpdateTicket') {
//                                    sh 'mvn test'
//                                }
//                            }
//                        }
//
//                        stage("DeleteTicket Test") {
//                            steps {
//                                dir('backend/DeleteTicket') {
//                                    sh 'mvn test'
//                                }
//                            }
//                        }
//                    }
                }
            }


            post {
                // Clean after build
//                success {
//                    step([$class          : 'JacocoPublisher',
//                          execPattern     : 'backend/DeleteTicket/build/jacoco/*.exec',
//                          classPattern    : 'backend/DeleteTicket/build/classes',
//                          sourcePattern   : 'backend/DeleteTicket/src/main/java',
//                          exclusionPattern: 'backend/DeleteTicket/src/test*'
//                    ])
//                }

                always {
                    cleanWs()
                }
            }
        }
    }
}