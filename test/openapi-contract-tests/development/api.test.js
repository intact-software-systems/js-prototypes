const OpenAPI = require('openapi-enforcer').v3_0.OpenApi
const Enforcer = require('openapi-enforcer')

const mockHeaders = require('../samples/headers.json')
const api = require('../led-server-open-api.json')

function copy(json) {
    return JSON.parse(JSON.stringify(json))
}

async function dereference(doc) {
    return Enforcer.dereference(copy(doc))
        .catch(error => {
            console.log(error)
        })
}

async function checkApi(options) {
    return dereference(api)
        .then(apiDoc => {
            const [value, error, warning] = OpenAPI(apiDoc)
            if (error) {
                console.log(JSON.stringify(error))
                console.log(JSON.stringify(warning))
                throw {
                    'error': 'Cannot parse openapi contract'
                }
            }
            return value.request(options)
        })
}

describe('test api requests', () => {

    test('get account', async () => {
        const req = await checkApi({
            method: 'GET',
            path: '/account',
            headers: mockHeaders,
            query: {}
        })

        if (req.error) {
            console.log(req.error)
        }

        expect(req.error).toBeUndefined()
    })

    test('create account', async () => {
        const createAccount = require('../test-data/requests.json').requests['/led/api/v1/account'].POST

        const req = await checkApi({
            method: 'POST',
            path: '/account',
            headers: mockHeaders,
            body: createAccount.body
        })

        if (req.error) {
            console.log(req.error)
        }
        expect(req.error).toBeUndefined()
    })

    test('test change product', async () => {
        const changeProductPatch = require('../test-data/requests.json').requests['/led/api/v1/account/changeProduct'].PATCH

        const req = await checkApi({
            method: 'PATCH',
            path: '/account/changeProduct',
            headers: mockHeaders,
            body: changeProductPatch.body
        })

        if (req.error) {
            console.log(req.error)
        }

        expect(req.error).toBeUndefined()
    })

    test('test account update', async () => {
        const accountUpdate = require('../test-data/requests.json').requests['/led/api/v1/account/update'].PATCH

        const req = await checkApi({
            method: 'PATCH',
            path: '/account/update',
            headers: mockHeaders,
            body: accountUpdate.body
        })

        if (req.error) {
            console.log(req.error)
        }

        expect(req.error).toBeUndefined()
    })
})




