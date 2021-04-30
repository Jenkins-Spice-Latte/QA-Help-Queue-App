pipeline {
    agent any
    environment {
        testvm_ip = '10.0.1.188'
    }
    stages {
        stage('Clone Repo') {
            steps {
                sh "chmod a+x ./jenkins_scripts/clone_repo.sh"
                sh "ssh -o StrictHostKeyChecking=no ubuntu@$testvm_ip < jenkins_scripts/clone_repo.sh"
            }
        }
    }
}