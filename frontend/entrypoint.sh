#!/bin/sh

echo "-----------------"
echo "Checking OTS Backend URL Environment Variable"
[[ -z "$REACT_APP_OTS_BACKEND_URL" ]] && echo "Empty Backend URL" && exit 1
echo
echo "-----------------"
echo "Setup environment file"
echo "REACT_APP_OTS_BACKEND_URL=$REACT_APP_OTS_BACKEND_URL" | tee .env
echo "-----------------"
echo 

if [ $REACT_APP_ENV == "dev" ]; then
  echo "-----------------"
  echo "Development Build"
  echo "-----------------"
  npm run start:dev
elif [ $REACT_APP_ENV == "prod" ]; then
  echo "-----------------"
  echo "Production Build"
  echo "-----------------"
  npm run build:prod
  serve -s build -l 3000
else
  echo "Unknown REACT_APP_ENV"
  echo "Please export REACT_APP_ENV=dev/prod"
  exit 1
fi