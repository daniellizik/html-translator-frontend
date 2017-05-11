#!bin/bash

set NODE_ENV=production
webpack --config webpack/production.js
pug ./src/views/entry -o ./www -P