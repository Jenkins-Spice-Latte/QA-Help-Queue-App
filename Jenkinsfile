pipeline {
    agent any
    environment {
        TEST_VM_IP = '10.0.1.188'
    }
    stages {
        stage('Clone Repo') {
            steps {
                sh "chmod a+x ./jenkins_scripts/clone_repo.sh"
                sh "ssh -i ~/.ssh/jenkins_agent_key -o StrictHostKeyChecking=no ubuntu@$TEST_VM_IP < jenkins_scripts/clone_repo.sh"
            }
        }
    }
}