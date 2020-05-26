const Enforcer = require('openapi-enforcer')
const Util = require('./util')

const api = require('../openapi.json')

describe('Contract tests', () => {

    test('test provider contracts', () => {
        Enforcer(api, {fullResult: true})
            .then(Util.logger())
            .catch(error => {
                console.log(error)
            })
    })

    test('test schema', () => {
        Enforcer.dereference(Util.copy(api))
            .then(docApi => {
                const {error, warning} = Enforcer.v3_0.Schema(docApi.components.schemas.account)
                if (!error) {
                    console.log('No errors with your document')

                    if (warning) {
                        console.warn(warning)
                    }
                }
                else {
                    console.error(error)
                }
            })
            .catch(error => {
                console.log(error)
            })
    })
})



