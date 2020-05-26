#!/bin/bash
trap "exit" INT TERM ERR
trap "kill 0" EXIT

currentdir=`pwd`
mockdir=src/mock
toolsdir=../tools/postman

openapi-enforcer create-api led-server-open-api.json -c operationId -o operationId ${mockdir}

cd ${mockdir} || exit

sed 's/const app = express();/const app = express(); app.use(require("cors")());/g' server/index.js > server/index2.js

cp server/index2.js server/index.js
rm server/index2.js

npm install cors
npm start &

cd "${currentdir}" || exit

sleep 10s

newman run -e ${toolsdir}/environments/mock.postman_environment.json ${toolsdir}/collections/led-server.postman_collection.json

wait