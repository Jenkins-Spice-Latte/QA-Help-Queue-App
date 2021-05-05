#! /bin/bash

kubectl apply -f nginx-config.yaml 
kubectl apply -f nginx-lb.yaml -f nginx.yaml 

kubectl apply -f svc_backend_createticket.yaml -f svc_backend_readticket.yaml -f svc_backend_updateticket.yaml -f svc_backend_deleteticket.yaml

kubectl apply -f backend_createticket.yaml -f backend_readticket.yaml -f backend_updateticket.yaml -f backend_deleteticket.yaml



kubectl set env deployment/create_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT
kubectl set env deployment/create_backend_deploy RDS_USERNAME=$RDS_USERNAME
kubectl set env deployment/create_backend_deploy RDS_PASSWORD=$RDS_PASSWORD

kubectl set env deployment/read_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT
kubectl set env deployment/read_backend_deploy RDS_USERNAME=$RDS_USERNAME
kubectl set env deployment/read_backend_deploy RDS_PASSWORD=$RDS_PASSWORD

kubectl set env deployment/update_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT
kubectl set env deployment/update_backend_deploy RDS_USERNAME=$RDS_USERNAME
kubectl set env deployment/update_backend_deploy RDS_PASSWORD=$RDS_PASSWORD

kubectl set env deployment/delete_backend_deploy RDS_ENDPOINT=$RDS_ENDPOINT
kubectl set env deployment/delete_backend_deploy RDS_USERNAME=$RDS_USERNAME
kubectl set env deployment/delete_backend_deploy RDS_PASSWORD=$RDS_PASSWORD