pipeline {
    agent any
    stages {
        stage('Build and Test') {
            agent {
                label 'testvm'
            }

            stages {
                stage("Clone Repo") {
                    steps {
                        git branch: 'frontend-backend', url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App/'
                    }
                }
//                stage('Test and Export Coverage') {
//                    parallel {
                stage("CreateTicket Test") {
                    steps {
                        dir('backend/CreateTicket') {
                            sh 'mvn test'
                        }
                    }
                }
                stage("ReadTicket Test") {
                    steps {
                        dir('backend/ReadTicket') {
                            sh 'mvn test'
                        }
                    }
                }
                stage("UpdateTicket Test") {
                    steps {
                        dir('backend/UpdateTicket') {
                            sh 'mvn test'
                        }
                    }
                }
                stage("DeleteTicket Test") {
                    steps {
                        dir('backend/DeleteTicket') {
                            sh 'mvn test'
                        }
                    }
                }
//                    }
//                }
            }

            post {
                // Clean after build
                always {
                    cleanWs()
                }
//                success {
//                    stash name: "artifacts", includes: "artifacts/**/*"
//                }
            }
        }
    }
}


/*
environment {
    TEST_VM_IP = '10.0.1.188'
    SSH_KEY_PATH = '~/.ssh/jenkins_agent_key'
    TEST_VM_SSH_COMMAND = 'ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no ubuntu@$TEST_VM_IP'
    SET_SCRIPT_EX_PERMS = 'chmod a+x'
}
 */

//
//stage("Maven Install (Build)") {
//    steps {
//        dir('~/workspace/backend/CreateTicket') {
//            sh 'mvn install'
//        }
//    }
//}
//
//
//    stage('Test On Windows') {
//        agent {
//            label "windows"
//        }
//        steps {
//            bat "run-tests.bat"
//        }
//        post {
//            always {
//                junit "**/TEST-*.xml"
//            }
//        }
//    }
//    stage('Test On Linux') {
//        agent {
//            label "linux"
//        }
//        steps {
//            sh "run-tests.sh"
//        }
//        post {
//            always {
//                junit "**/TEST-*.xml"
//            }
//        }
//    }
//}