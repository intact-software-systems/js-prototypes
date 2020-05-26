const http = require('http')

const url = 'http://localhost:8080/led/api/v1/openapi.json'

http
    .get(url, response => {
        let data = ''

        response.on('data', chunk => {
            data += chunk
        })

        response.on('end', () => {
            console.log(data)
        })
    })
    .on('error', error => {
        console.error(error)
    })