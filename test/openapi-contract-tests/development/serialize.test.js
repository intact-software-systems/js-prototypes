const Enforcer = require('openapi-enforcer')

const Util = require('./util')
const validationUtil = require('./validationUtil')
const api = require('../led-server-open-api.json')
const account = require('../samples/account.json')

async function dereferenceApiDoc() {
    return await validationUtil.dereference(Util.copy(api))
}

dereferenceApiDoc()
    .then(apiDoc => {
        const [schema] = new Enforcer.v3_0.Schema(apiDoc.components.schemas.account)
        const [value] = schema.serialize(account)
        console.log(value)

        const result = schema.validate(account)
        console.log(result)
    })
