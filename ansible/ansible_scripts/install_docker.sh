if [ ! -f /usr/bin/docker ]; then
    sudo apt install curl -y
    curl https://get.docker.com | sudo bash
    sudo usermod -aG docker $(whoami)
fi
docker --version