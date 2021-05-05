#! /bin/bash

# Script to deploy eks cluster 
clusterExist=$(eksctl get cluster | grep -w "project-cluster")
var_length=${#clusterExist}

if (( ${var_length}==0 )); then
echo 'launching cluster'
eksctl create cluster -f cluster.yaml
fi