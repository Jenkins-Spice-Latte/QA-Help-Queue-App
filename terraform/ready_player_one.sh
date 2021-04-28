#!/bin/bash

sudo apt update -y && sudo apt upgrade -y
sudo apt install unzip

# getting terraform zip
if [ ! -f terraform_0.15.1_linux_amd64.zip ]
then
	wget https://releases.hashicorp.com/terraform/0.15.1/terraform_0.15.1_linux_amd64.zip
fi

unzip terraform_*_linux_*.zip
cd terraform_0.15.1_linux_amd64


# applying terraform binary
if [ ! -f /usr/local/bin/terraform ]
then
	sudo mv terraform /usr/local/bin
fi

terraform --version