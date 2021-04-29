#!/bin/bash

sudo apt update -y && sudo apt upgrade -y

echo "[TERRAFORM SCRIPT START]"
if [ ! -f /usr/local/bin/terraform ]; then
  if [ ! -f terraform_0.15.1_linux_amd64.zip ]; then
    if [ ! -f /usr/bin/unzip ]; then
      sudo apt install unzip
    fi
    wget https://releases.hashicorp.com/terraform/0.15.1/terraform_0.15.1_linux_amd64.zip
    unzip terraform_*_linux_*.zip
    cd terraform_0.15.1_linux_amd64 || exit
  fi
  sudo mv terraform /usr/local/bin
fi

echo "[TERRAFORM SCRIPT END]"

echo "[ANSIBLE SCRIPT START]"
sudo apt install software-properties-common -y
sudo apt-add-repository --yes --update ppa:ansible/ansible
sudo apt install ansible -y
echo "[ANSIBLE SCRIPT END]"

terraform --version
ansible --version
