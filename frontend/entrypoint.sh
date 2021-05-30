#!/bin/sh

if [ $REACT_APP_ENV == "dev" ]; then
  echo "-----------------"
  echo "Development Build"
  echo "-----------------"
  npm run start:dev
else
  echo "-----------------"
  echo "Production Build"
  echo "-----------------"
  npm run build:prod
  serve -s build -l 3000
fi