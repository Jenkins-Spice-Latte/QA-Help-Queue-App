if [ ! -f /usr/bin/mysql ]; then
    sudo apt install mysql-client -y
fi
mysql --version