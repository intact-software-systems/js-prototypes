const api = require('./api-service')
const compare = require('./compareJsonStructure')

describe('test api', () => {

    test('get accounts', async () => {
        return api.getAccounts()
            .then(json => {
                console.log(JSON.stringify(json))
                expect(json).toBeDefined()
                return json
            })
            .then(json => {
                if (compare.compareGetAccounts(json)) {
                    return true
                }
                else {
                    throw 'Incompatible'
                }
            })
            .catch(e => {
                console.log(e)
                expect(e).toBeUndefined()
            })
    })

    test('get account', async () => {
        return api.getOneAccount()
            .then(json => {
                console.log(JSON.stringify(json))
                expect(json).toBeDefined()
                return json
            })
            .then(json => {
                if (compare.compareGetOneAccount(json)) {
                    return true
                }
                else {
                    throw 'Incompatible'
                }
            })
            .catch(e => {
                console.log(e)
                expect(e).toBeUndefined()
            })
    })

    test('create account', async () => {
        return api.createAccount()
            .catch(e => {
                console.log(e)
                expect(e).toBeUndefined()
            })
    })

    test('change account product', async () => {
        return api.changeProduct()
            .catch(e => {
                console.log(e)
                expect(e).toBeUndefined()
            })
    })

    test('update account', async () => {
        return api.accountUpdate()
            .catch(e => {
                console.log(e)
                expect(e).toBeUndefined()
            })
    })
})




