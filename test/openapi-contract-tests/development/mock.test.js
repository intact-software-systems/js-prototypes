const axios = require('axios')
const accountHeaders = require('../samples/headers.json')

axios(
    {
        method: 'GET',
        url: 'http://localhost:3000/account',
        headers: accountHeaders
    })
    .then(result => {
        console.log(result.data)
        return result.data
    })
    .catch(error => {
        console.error(error)
    })
