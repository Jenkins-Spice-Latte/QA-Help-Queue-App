pipeline {
    options {
        // only allowing 1 build at a time for each branch.
        disableConcurrentBuilds()
        //fail the pipeline after 30 min
        timeout(time: 30, unit: 'MINUTES')
    }
    agent any
    stages {
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
                    //sh "kubectl apply -f nginx_config.yaml"
                    sh "kubectl apply -f svc_nginx_lb.yaml -f nginx.yaml"

                    sh "kubectl apply -f svc_backend_createticket.yaml -f svc_backend_readticket.yaml -f svc_backend_updateticket.yaml -f svc_backend_deleteticket.yaml"
                    sh "kubectl apply -f backend_createticket.yaml -f backend_readticket.yaml -f backend_updateticket.yaml -f backend_deleteticket.yaml"

                    sh "kubectl rollout restart deployment create-backend-deploy"
                    sh "kubectl rollout restart deployment read-backend-deploy"
                    sh "kubectl rollout restart deployment update-backend-deploy"
                    sh "kubectl rollout restart deployment delete-backend-deploy"
                    sh "kubectl rollout restart deployment nginx"

                    sh "sleep 30"

                    sh "kubectl get services"
                    sh "kubectl get pods"

                    //sh "kubectl set env deployment/create_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    // sh "kubectl set env deployment/create_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    // sh "kubectl set env deployment/create_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    // sh "kubectl set env deployment/read_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    // sh "kubectl set env deployment/read_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    // sh "kubectl set env deployment/read_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    // sh "kubectl set env deployment/update_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    // sh "kubectl set env deployment/update_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    // sh "kubectl set env deployment/update_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"

                    // sh "kubectl set env deployment/delete_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT"
                    // sh "kubectl set env deployment/delete_backend_deploy RDS_USERNAME=$RDS_USERNAME"
                    // sh "kubectl set env deployment/delete_backend_deploy RDS_PASSWORD=$RDS_PASSWORD"            
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