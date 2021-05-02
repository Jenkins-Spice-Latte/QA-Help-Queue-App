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