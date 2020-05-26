const Enforcer = require('openapi-enforcer')

const Util = require('./util')
const validationUtil = require('./validationUtil')
const api = require('../openapi.json')
const account = require('../samples/account.json')

describe('data validation tests', () => {

    test('validate account', async () => {
        const apiDoc = await validationUtil.dereference(Util.copy(api))
        const [schema] = new Enforcer.v3_0.Schema(apiDoc.components.schemas.account)
        const result = schema.validate(account)
        console.log(result)
        expect(result).toBeUndefined()
    })

    test('validate AccountReadResponse', async () => {
        const apiDoc = await validationUtil.dereference(Util.copy(api))
        const [schema] = new Enforcer.v3_0.Schema(apiDoc.components.schemas.AccountReadResponse)
        const result = schema.validate(account)
        console.log(result)
        expect(result).toBeUndefined()
    })
})


