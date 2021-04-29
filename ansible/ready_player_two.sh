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
    3.9.135.38:
    18.132.14.178:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

jenkins:
  hosts:
    18.133.181.216:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"

bastion:
  hosts:
    18.134.198.195:
  vars:
    ansible_user: ubuntu
    ansible_ssh_private_key_file: \"/home/ubuntu/.ssh/i_dont_give_a_ssh\"
    ansible_ssh_common_args: \"-o StrictHostKeyChecking=no\"
" > $destFile