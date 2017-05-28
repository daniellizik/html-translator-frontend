should be nginx/docker. 

use nginx to reverse proxy to api services. 

upload static front end assets to s3 from here.

environment variables in this repo responsible for configuring which deployed services are pinged. front end should just fetch from configured url `<service-url>/api/<route>`

## stuff

https://trello.com/b/rthWKxZk/template-translator

https://travis-ci.org/daniellizik/template-translator