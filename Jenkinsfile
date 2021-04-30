pipeline {
  agent any
  stages {
    stage('Clone repo') {
      steps {
        git(url: 'https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App', branch: 'jenkins', poll: true)
      }
    }

  }
}