# root / outputs

output "jenkins_public_ip" {
  value = module.INSTANCE_JENKINS.public_ip
}

output "testvm_public_ip" {
  value = module.INSTANCE_TEST.public_ip
}

output "testvm_private_ip" {
  value = module.INSTANCE_TEST.private_ip
}

# test vm ip