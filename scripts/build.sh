#!bin/bash

./node_modules/.bin/cross-env NODE_ENV=production
./node_modules/.bin/webpack --config webpack/production.js