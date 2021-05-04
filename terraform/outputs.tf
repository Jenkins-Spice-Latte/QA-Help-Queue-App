# root / outputs

output "jenkins_public_ip" {
  value = module.INSTANCE_JENKINS.public_ip
}

output "testvm_private_ip" {
  value = module.INSTANCE_TEST.private_ip
}

output "bastion_public_ip" {
  value = module.INSTANCE_BASTION.public_ip
}

output "test_db_endpoint" {
  value = module.TEST_RDS.endpoint
}

output "prod_db_endpoint" {
  value = module.PROD_RDS.endpoint
}

output "eks_certificate_authority" {
  value = module.EKS_CLUSTER.certificate_authority
}

output "eks_certificate_authority_data" {
  value = module.EKS_CLUSTER.certificate_authority_data
}

output "eks_cluster_name" {
  value = module.EKS_CLUSTER.cluster_name
}

output "eks_cluster_endpoint" {
  value = module.EKS_CLUSTER.cluster_endpoint
}
