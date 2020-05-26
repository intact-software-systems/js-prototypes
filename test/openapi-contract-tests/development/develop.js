const Enforcer = require('openapi-enforcer')
const Util = require('./util')
const validationUtil = require('./validationUtil')
const api = require('../led-server-open-api.json')
const account = require('../samples/account.json')

async function mockValue() {
    const apiDoc = await validationUtil.dereference(Util.copy(api))

    let mock = validationUtil.mock(apiDoc.components.schemas.account)
    console.log(mock)
    return mock
}


async function dereferenceApiDoc() {
    return await validationUtil.dereference(Util.copy(api))
}

dereferenceApiDoc()
    .then(apiDoc => {
        const [schema] = new Enforcer.v3_0.Schema(apiDoc.components.schemas.account)

        const [value] = schema.random()//?

        console.log(value)

        const err = schema.validate(account) //?

        console.log(err)
    })



