const fetch = require('node-fetch')

const requests = require('../test-data/requests.json')
const prismUrl = require('../config.json').prismUrl

function checkStatus(res) {
    if (res.ok) { // res.status >= 200 && res.status < 300
        return res
    }
    else {
        throw res.statusText
    }
}

module.exports = {
    getAccounts: () => {
        const getAccount = requests.requests['/account'].GET

        return fetch(
            prismUrl + '/account',
            {
                method: 'GET',
                headers: getAccount.headers
            })
            .then(res => checkStatus(res))
            .then(res => res.json())
    },

    getOneAccount: () => {
        const getAccount = requests.requests['/account/NO36240000108'].GET

        return fetch(
            prismUrl + '/account/NO36240000108',
            {
                method: 'GET',
                headers: getAccount.headers
            })
            .then(res => checkStatus(res))
            .then(res => res.json())
    },

    createAccount: () => {
        const createAccount = requests.requests['/account'].POST

        return fetch(
            prismUrl + '/account',
            {
                method: 'POST',
                headers: createAccount.headers,
                body: JSON.stringify(createAccount.body),
                mode: 'cors',
                referrer: 'no-referrer'
            })
            .then(res => checkStatus(res))
    },

    changeProduct: () => {
        const changeProductPatch = requests.requests['/account/changeProduct'].PATCH

        return fetch(
            prismUrl + '/account/changeProduct',
            {
                method: 'PATCH',
                headers: changeProductPatch.headers,
                body: JSON.stringify(changeProductPatch.body)
            })
            .then(res => checkStatus(res))
    },

    accountUpdate: () => {
        const accountUpdate = requests.requests['/account/update'].PATCH

        return fetch(
            prismUrl + '/account/update',
            {
                method: 'PATCH',
                headers: accountUpdate.headers,
                body: JSON.stringify(accountUpdate.body)
            })
            .then(res => checkStatus(res))
    }
}