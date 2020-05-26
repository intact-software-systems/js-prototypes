const axios = require('axios')
const accountHeaders = require('../samples/headers.json')

test('test account', async () => {
    try {
        const result = await axios({
            method: 'GET',
            url: 'http://localhost:4010/account',
            headers: accountHeaders
        })

        console.log(JSON.stringify(result.data, null, 2))

    } catch (e) {
        console.error(e)
    }
})
