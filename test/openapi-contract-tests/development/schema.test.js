const Enforcer = require('openapi-enforcer')
const axios = require('axios')
const accountHeaders = require('../samples/headers.json')
const Util = require('./util')
const validationUtil = require('./validationUtil')
const api = require('../led-server-open-api.json')

describe('schema tests', () => {

    it('compare account values', async () => {
        const apiDoc = await validationUtil.dereference(Util.copy(api))

        let mock = validationUtil.mock(apiDoc.components.schemas.account)
        console.log(mock)

        const result = await axios({
            url: 'http://localhost:3000/account',
            headers: accountHeaders
        })

    })

})

