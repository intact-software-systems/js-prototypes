#!/bin/bash
set -x
trap "exit" INT TERM ERR
trap "kill 0" EXIT

curl http://localhost:8080/led/api/v1/openapi.json -O

# If not installed, then install
#npm install -g prism newman

# mock -d -> dynamic responses
# mock -> static responses using examples if present
prism mock openapi.json &

sleep 2s

toolsdir=../tools/postman

newman run -e ${toolsdir}/environments/mock.postman_environment.json ${toolsdir}/collections/led-server.account.postman_collection.json
