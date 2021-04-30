pipeline {
    agent any
    /*
    environment {
        TEST_VM_IP = '10.0.1.188'
        SSH_KEY_PATH = '~/.ssh/jenkins_agent_key'
        TEST_VM_SSH_COMMAND = 'ssh -i $SSH_KEY_PATH -o StrictHostKeyChecking=no ubuntu@$TEST_VM_IP'
        SET_SCRIPT_EX_PERMS = 'chmod a+x'
    }
     */
    stages {
        stage('Clone and Checkout Repo') {
            agent { label 'testvm' }
            steps {
                // sh "$SET_SCRIPT_EX_PERMS ./jenkins_scripts/clone_repo.sh"
                // sh "$TEST_VM_SSH_COMMAND < ./jenkins_scripts/clone_repo.sh"
                git branch: 'frontend-backend', url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App/'
                dir('./backend/CreateTicket') {
                    sh 'touch testing_this_directory'
                }

            }
        }

//        stage('Run Maven Test') {
//            agent { label 'testvm' }
//            steps {
//                dir('./backend/CreateTicket') {
//                    sh 'touch testing_this_directory'
//                }
//            }
//        }



//        stage('Build Docker Images') {
//            steps {
//            }
//        }

    }
}