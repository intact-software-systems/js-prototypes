# Consumer-driven-contracts

## Contract testing using OpenAPI json files could work like this

All REST APIs publish their OpenAPI json to a server (this should have a version number, e.g. v1).
    
If there is a breaking change, then a new OpenAPI json should be published with a new version number (e.g. v2).

### Consumer of a given REST API:
- Download the OpenAPI json file (e.g. v1, v2 or latest)
- Check that the OpenAPI json is complies (No missing headers or field names)
    - Header names
    - Field names
    - Structure

### Optional: Consumer-driven contract testing

Each consumer of a REST API publishes a redacted version of the OpenAPI json file.

The redacting is done like so:
 - Unused fields are removed
 - Unused headers are removed

When a publisher changes its own REST API it checks each consumer's requirements. 

The test could be to compare consumer's OpenAPI json to publisher's OpenAPI json.

All could be implemented in NodeJs/javascript

### Version control of Rest API
A breaking change is causing a new major version is: 
- Rename or remove of header or field. 
- Restructuring of json data
- Field data is used for something different.





# URLs

https://editor.swagger.io/

https://jestjs.io/docs/en/getting-started

https://medium.com/typeforms-engineering-blog/contract-testing-iii-there-and-back-again-199672a60705

https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

## JEST

npm install jest --global


jest my-test --notify --config=config.json

https://medium.com/front-end-weekly/fix-element-is-not-imported-jest-describe-it-expect-in-webstorm-aaf8c29ae3c2


https://blog.jetbrains.com/webstorm/2018/10/testing-with-jest-in-webstorm/

https://www.jetbrains.com/help/idea/run-debug-configuration-jest.html

## To support import

add to package.json

     "type": "module",
