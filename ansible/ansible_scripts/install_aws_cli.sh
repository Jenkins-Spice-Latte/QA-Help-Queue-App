#! /bin/bash
if [ ! -f /usr/local/bin/aws ]; then
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    sudo apt install -y unzip 
    unzip -o awscliv2.zip
    sudo ./aws/install
fi
aws --version