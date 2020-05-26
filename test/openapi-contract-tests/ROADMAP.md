## Roadmap

- Component tests that use json files to instantiate tests
- Use the same test-data json files to validate contracts


### Consumers write "Provider tests"

Only validate the REST APIs that I integrate with.

Download OpenAPI json:

    {
        "api": "led-server",
        "version": "v1"
    }
    
    curl url:port/view2/led-server/v1 > led-server-v1-open-api.json

Start OpenAPI mock server using led-server-v1-open-api.json.

Local test data: 

    {
        "account": "A",
        "type": "B"
    }
    
Mocking of test data based on OpenApi contract:

    {
        "account": "A",
        "type": "C"
    }
    
Compare local test data field names and structure with mocked field name and structure


https://byu-oit.github.io/openapi-enforcer/guide/enforcer-exception


### Provider tests

The provider can execute each consumer's "provider tests" using its own version of OpenAPI json.

In the shared repository the consumers have the "Provider tests" as described above. 
    
On jenkins the provider executes these "provider tests" with its version of the OpenAPI. 

If the OpenAPI does not work with the "provider test" then it fails.


### "Provider tests"


### Response tests: Use actual test-data



### Request tests: Use prism mocked server of OpenAPI 

Download OpenAPI json from view2

Start mocking server using this version of OpenAPI

Execute postman tests with newman on command line

https://www.npmjs.com/package/newman

https://stoplight.io/p/docs/gh/stoplightio/prism/README.md?srn=gh/stoplightio/prism/README.md

## Helpful libraries

https://byu-oit.github.io/openapi-enforcer/api/components/schema
https://openapi.tools/#data-validators

https://www.npmjs.com/package/newman#json-reporter

https://stoplight.io/studio/

https://stoplight.io/open-source/prism/

## Issues

### int64

Javascript does not support a type int64. We can remove the format and it will automatically be 64 bit.

https://community.stoplight.io/t/prism-saying-its-violating-the-openapi-spec-its-mocking/1209/4
