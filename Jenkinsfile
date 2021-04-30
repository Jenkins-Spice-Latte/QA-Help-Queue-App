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

                dir('backend/CreateTicket') {
                    stage("Maven Test") {
                        steps {
                            sh 'mvn test'
                        }
                    }

                    stage("Maven Install (Build)") {
                        steps {
                            dir('~/workspace/backend/CreateTicket') {
                                sh 'mvn install'
                            }
                        }
                    }
                }
            }

            post {
                // Clean after build
                always {
                    cleanWs()
                }
                success {
                    stash name: "artifacts", includes: "artifacts/**/*"
                }
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