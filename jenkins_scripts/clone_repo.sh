
BRANCH=frontend-backend

if [ -d "QA-Help-Queue-App" ]; then
  rm -rf QA-Help-Queue-App
fi

git clone https://github.com/Jenkins-Spice-Latte/QA-Help-Queue-App

if [ -d "QA-Help-Queue-App" ]; then
  cd QA-Help-Queue-App || exit
  git checkout $BRANCH
fi