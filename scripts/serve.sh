#!bin/bash

./node_modules/.bin/cross-env NODE_ENV=development
./node_modules/.bin/webpack-dev-server --hot  --content-base ./ --config ./webpack/development.js