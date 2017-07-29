#!bin/bash

source ./env.sh
set NODE_ENV=production
set VERSION=$VERSION
webpack --config webpack/production.js
pug ./src/views/entry -o ./build -P
npm run build:docker