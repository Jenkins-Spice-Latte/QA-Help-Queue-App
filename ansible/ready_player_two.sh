#!/bin/bash

bastion_public_ip=$(cd ~/QA-Help-Queue-App/terraform || exit ; terraform output bastion_public_ip | tr -d '"')
jenkins_public_ip=$(cd ~/QA-Help-Queue-App/terraform || exit ; terraform output jenkins_public_ip | tr -d '"')
testvm_private_ip=$(cd ~/QA-Help-Queue-App/terraform || exit ; terraform output testvm_private_ip | tr -d '"')

echo "${bastion_public_ip}"
echo "${jenkins_public_ip}"
echo "${testvm_private_ip}"

destFile=~/QA-Help-Queue-App/ansible/inventory.yaml
if [ -f "$destFile" ]; then
  rm $destFile
fi

touch $destFile
echo "
all:
  hosts:
    ${bastion_public_ip}:
    ${jenkins_public_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

bastion:
  hosts:
     ${bastion_public_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

jenkins:
  hosts:
    ${jenkins_public_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

testvm:
  hosts:
    ${testvm_private_ip}:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: '-o StrictHostKeyChecking=no -o ProxyCommand=\"ssh -i /home/ubuntu/.ssh/i_dont_give_a_ssh -W %h:%p -q ${bastion_public_ip}\"'

" >$destFile
